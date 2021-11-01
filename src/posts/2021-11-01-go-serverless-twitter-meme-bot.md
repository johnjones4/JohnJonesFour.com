---
layout: post
title: "How To Write a Go/Lambda Based Twitter Meme Bot"
description: "What's more fun than a pep talk by a Coach Ted Lasso bot?!"
githubs:
  - johnjones4/pep-talk-generator
---

![Coach Lasso](/images/lasso.jpg)

It's been a while since I wrote a fun bot, so on Sunday evening I cracked my knuckles, set up a new repo and wrote a bot I've been thinking about for a little while: a "pep talk" generator themed after Apple's hit show _Ted Lasso_ and a cool [_pep talk generator_ graphic posted on Reddit](https://www.reddit.com/r/coolguides/comments/qacund/handy_pep_talk_guide/). Here's how my bot works:

## Generate the Pep Talk

First, let's generate the talk's text. To do that, I encoded the chart's text in a 2D array (truncated here), and then wrote a function that goes through the top level array, randomly chooses one element from each array, and adds that to a string.

```go
var parts = [][]string{
	{
		"Champ",
		"Fact:",
		"Everybody says",
    ...
	},
	{
		"the mere idea of you",
		"your soul",
		"your hair today",
		...
	},
	{
		"has serious game",
		"rains magic",
		"deserves the Nobel Prize",
		...
	},
	{
		"24/7.",
		"can I get an amen?",
		"and that's a fact.",
		...
	},
}

func generateRandomSentence() string {
	str := strings.Builder{}
	for i, strs := range parts {
		index := rand.Intn(len(strs))
		str.WriteString(strs[index])
		if i == 2 {
			str.WriteString(",")
		}
		if i < len(parts)-1 {
			str.WriteString(" ")
		}
	}
	return str.String()
}
```

## Get An Image

I sourced 17 images of Ted Lasso from the Google Image Search and put them in an S3 bucket. This function picks a random one.

```go
const (
	nImages = 17
)

func getRandomImage(client *s3.Client) (image.Image, error) {
	imageFileName := fmt.Sprintf("%d.jpg", rand.Int31n(nImages))
	input := &s3.GetObjectInput{
		Bucket: aws.String(os.Getenv("SOURCE_IMAGES_BUCKET")),
		Key:    aws.String(imageFileName),
	}
	resp, err := client.GetObject(context.Background(), input)
	if err != nil {
		return nil, err
	}
	return jpeg.Decode(resp.Body)
}
```

## Build the Meme

To assemble the actual meme, I used the library [fogleman/gg](https://github.com/fogleman/gg), which has some helpful graphics functions on top of Go's standard library. This function takes the pep talk sentence and the chosen image, renders the text with a nice little drop shadow on the image, and returns the new image.

```go
const (
  shadowOffset = 2
)

func renderSentence(sentence string, image image.Image) (image.Image, error) {
	ctx := gg.NewContextForImage(image)
	fontSize := float64(image.Bounds().Max.Y) / 21.0
	if err := ctx.LoadFontFace(os.Getenv("FONT_FACE_PATH"), fontSize); err != nil {
		return nil, err
	}
	x := float64(image.Bounds().Max.X) / 2.0
	y := float64(image.Bounds().Max.Y) - (fontSize * 2.0)
	ctx.SetRGB(0, 0, 0)
	ctx.DrawStringAnchored(sentence, x+shadowOffset, y+shadowOffset, 0.5, 0.5)
	ctx.SetRGB(1, 1, 1)
	ctx.DrawStringAnchored(sentence, x, y, 0.5, 0.5)
	return ctx.Image(), nil
}
```

## Transmit to Twitter

With an assembled image, the bot uploads it to Twitter in `uploadImage` and then tweets it in `tweetMeme`. This uses a generic OAuth1 library combined with standard HTTP requests rather an any sort of Twitter client.

```go
var (
	twitterConfig = oauth1.NewConfig(os.Getenv("TWITTER_CONSUMER_KEY"), os.Getenv("TWITTER_CONSUMER_SECRET"))
	twitterToken  = oauth1.NewToken(os.Getenv("TWITTER_ACCESS_TOKEN"), os.Getenv("TWITTER_ACCESS_TOKEN_SECRET"))
	twitterClient = twitterConfig.Client(oauth1.NoContext, twitterToken)
)

type tweetMediaResponse struct {
	MediaIdString string `json:"media_id_string"`
}

func uploadImage(img image.Image) (string, error) {
	var jsonBytes bytes.Buffer
	var opts jpeg.Options
	opts.Quality = 50
	err := jpeg.Encode(&jsonBytes, img, &opts)
	if err != nil {
		return "", err
	}

	imgB64 := base64.StdEncoding.EncodeToString(jsonBytes.Bytes())

	var v url.Values = make(map[string][]string)
	v.Add("media_category", "tweet_image")
	v.Add("media_data", imgB64)

	req, err := http.NewRequest("POST", "https://upload.twitter.com/1.1/media/upload.json", bytes.NewReader([]byte(v.Encode())))
	if err != nil {
		return "", err
	}

	req.Header.Add("Content-type", "application/x-www-form-urlencoded")

	resp, err := twitterClient.Do(req)
	if err != nil {
		return "", err
	}

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	if resp.StatusCode != 200 {
		return "", fmt.Errorf("error response: %s", string(respBody))
	}

	var respStruct tweetMediaResponse
	err = json.Unmarshal(respBody, &respStruct)
	if err != nil {
		return "", err
	}

	return respStruct.MediaIdString, nil
}

func tweetMeme(text string, mediaId string) error {
	var v url.Values = make(map[string][]string)
	modifier := quoteModifiers[rand.Intn(len(quoteModifiers))]
	v.Add("status", fmt.Sprintf("\"%s\"\n - Coach Lasso (%s)", text, modifier))
	v.Add("media_ids", mediaId)
	req, err := http.NewRequest("POST", "https://api.twitter.com/1.1/statuses/update.json?"+v.Encode(), nil)
	if err != nil {
		return err
	}

	req.Header.Add("Authorization", fmt.Sprintf("Bearer: %s", os.Getenv("TWITTER_TOKEN")))
	req.Header.Add("Content-type", "application/json")

	resp, err := twitterClient.Do(req)
	if err != nil {
		return err
	}

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	if resp.StatusCode != 200 {
		return fmt.Errorf("bad response: %s", string(respBody))
	}

	log.Println(string(respBody))

	return nil
}
```

## The Lambda Handler

Bringing it altogether, a Lambda handler calls all these functions:

```go
func handler(ctx context.Context, event events.CloudWatchEvent) {
	cfg, err := config.LoadDefaultConfig(context.Background())
	if err != nil {
		panic(err)
	}

	client := s3.NewFromConfig(cfg)

	rand.Seed(time.Now().UnixNano())
	sentence := generateRandomSentence()
	image, err := getRandomImage(client)
	if err != nil {
		panic(err)
	}
	meme, err := renderSentence(sentence, image)
	if err != nil {
		panic(err)
	}
	mediaId, err := uploadImage(meme)
	if err != nil {
		panic(err)
	}
	err = tweetMeme(sentence, mediaId)
	if err != nil {
		panic(err)
	}
}

func main() {
	lambda.Start(handler)
}
```

## Deploying

I deploy this app using the Serverless framework, which is a breathtakingly simple way to deploy to Lambda. The `serverless.yml` file for this is straightforward; it provisions a bucket, permissions, and one Lambda that runs every hour.

```yml
service: peptalkbot

provider:
  name: aws
  runtime: go1.x

  iamRoleStatements:
    - Effect: "Allow"
      Action:
       - "s3:GetObject"
      Resource:
        Fn::Join:
          - ""
          - - "arn:aws:s3:::"
            - ${self:custom.sourceImagesBucketName}
            - "/*"

custom:
  sourceImagesBucketName: peptalkbotsourceimages

package:
  individually: true
  exclude:
    - ./**/*.go
    - ./go.*
    - ./**/*.jpg
    - ./Makefile
    - ./**/*.yml

functions:
  generate:
    handler: peptalk
    package:
      include:
        - ./peptalk
    events:
      - schedule: rate(1 hour)
    environment:
      SOURCE_IMAGES_BUCKET: ${self:custom.sourceImagesBucketName}
      TWITTER_ACCESS_TOKEN: ${file(./priv.yml):TWITTER_ACCESS_TOKEN}
      TWITTER_ACCESS_TOKEN_SECRET: ${file(./priv.yml):TWITTER_ACCESS_TOKEN_SECRET}
      TWITTER_CONSUMER_SECRET: ${file(./priv.yml):TWITTER_CONSUMER_SECRET}
      TWITTER_CONSUMER_KEY: ${file(./priv.yml):TWITTER_CONSUMER_KEY}

resources:
  Resources:
    SourceBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: ${self:custom.sourceImagesBucketName}
```
