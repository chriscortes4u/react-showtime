const h = require('react-hyperscript')
const React = require('react')
const xhr = require('xhr')

const {
  Link
} = require('react-router')

const Moviedb = React.createClass({
  getInitialState: function () {
    return {
      s: '',
      r: 'json',
      movies: []
    }
  },
  handleChange: function(e){
    this.setState({
      s: e.target.value
    })
  },
  handleSubmit: function(e){
    e.preventDefault()
    xhr({
      method: 'GET',
      json: true,
      url:`http://www.omdbapi.com/?r=json&s=${this.state.s}`
    }, (err, res, body) => {
      if (err) { return console.log(err.message)}
      this.setState({
        movies: body.Search
      })
    })
},
    render: function(){
      console.log(this.state)
    return (
      h('div.pa4', [
        h('h1', 'Movies'),
        h('form', { onSubmit: this.handleSubmit
        }, [
        h('input.mb2', { onChange: this.handleChange
          })
        ]),
        h('button', 'Browse All'),
        h(Link, {
          to: '/',
          className: 'link db mt2'
        }, 'Home'),
      //  h('pre', JSON.stringify(this.state.movies, null, 4)),
        h('div', this.state.movies.map(movie =>
          h('a', {href:'http://www.imdb.com/title/'+ movie.imdbId } h('img', {
            src: movie.Poster

          }))
        )),

        h(Link, {
          to: '/',
          className: 'link db mt2'
        }, 'Home')
      ]
    ))
    }
})
module.exports = Moviedb
