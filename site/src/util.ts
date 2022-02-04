export const navLinks = [
  {
    path: '/experience',
    label: 'Experience'
  },
  {
    path: '/photography',
    label: 'Photography'
  },
  {
    path: '/posts',
    label: 'Posts'
  },
  {
    path: '/contact',
    label: 'Contact'
  }
]

export const socialLinks = [
  {
    link: 'https://twitter.com/johnjones4',
    label: 'twitter'
  },
  {
    link: 'https://linkedin.com/in/johnjones4',
    label: 'linkedin'
  },
  {
    link: 'https://github.com/johnjones4',
    label: 'github'
  }
]

export const ping = async () => {
  try {
    await fetch('/api/ping', {
      method: 'post',
      body: JSON.stringify({
        url: window.location.href,
        referer: document.referrer
      })
    })
  } catch (e) {
    console.error(e)
  }
}
