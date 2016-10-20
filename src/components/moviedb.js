const React = require('react')
const h = require('react-hyperscript')
const xhr = require('xhr')
const { Link } = require('react-router')

const newmanImg = './img/magic-word-2.gif'

function renderMovie(movie){
var movieImg = (movie.Poster === 'N/A') ? newmanImg : movie.Poster
  return(
    h('div.movie-container', [
      h('div.fl.db.w-100.w-50-m.w-25-l.overflow-hidden', {
        style: {
          position: 'relative',
          cursor: 'pointer'
        }
      }, [
        h('a.db.w-100.h-100.aspect-ratio--4x6.grow', {
          href: 'http://www.imdb.com/title/' + movie.imdbID,
          target: '_blank',
          style: {
            background: `url(${movieImg}) no-repeat center center`,
            backgroundSize: 'cover'
          }
        }, ''),
        h('h2.f3.pa2.tc', {
          style: {
            position: 'absolute',
            bottom: '10px',
            left: '0'
          }
        }, [
          h('a.link', {
            href: 'http://www.imdb.com/title/' + movie.imdbID,
            style: {
              color: 'white',
              textShadow: '2px 2px 6px rgba(0,0,0,.9)'
            }
          },
          movie.Title + ' (' + movie.Year + ')')
        ]
        )
      ])
    ])
  )
}
const Moviedb = React.createClass({
  getInitialState: function () {
    return {
      s: '',
      r: 'json',
      results: {}
    }
  },
  handleChange: function (e) {
    this.setState({
      s: e.target.value
    })
  },
  handleSubmit: function (e) {
    e.preventDefault()
    xhr({
      method: 'GET',
      json: true,
      url: `https://www.omdbapi.com/?r=${this.state.r}&s=${this.state.s}`
    }, (err, resp, body) => {
      if (err) return console.log(err.message)
      this.setState({
        results: body
      })
    })
  },
  render: function () {
    console.log(this.state)
    // var count = 0
    var content = ''

    if (this.state.results['Response'] === 'False') {
      content = [
        h('p.f1.tc', { 'style': {'color': 'red'} }, 'No Results'),
        h('img.', { src: newmanImg })
      ]
    }
    if (this.state.results['Search']) {
      content = this.state.results['Search'].map(movie =>renderMovie(movie))
    }

    return h('div.pv2.ph5.bg-mid-gray', [
      h('header', [
        h('h1.tc', 'Movie Search')
        // h('h2', count)
      ]),
      h('form.tc', {
        onSubmit: this.handleSubmit
      }, [
        h('input.mb2', {
          onChange: this.handleChange
        }),
        h('p', [
          h('button.tc', 'Browse All')
        ])
      ]),
      h('div.content.cb', content),
      h(Link, {
        to: '/',
        className: 'link db mv4 tc cl'
      }, 'Home')
    ])
  }
})

module.exports = Moviedb
