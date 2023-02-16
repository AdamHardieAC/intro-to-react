import { Component } from 'react'

class Carousel extends Component {
  state = {
    active: 0,
  }

  static defaultProps = {
    images: ['http://pets-images.dev-apis.com/pets/none.jpg'],
  }
  handleIndexClick = (e) => {
    //+e is a unary plus, which converts a string to int
    this.setState({
      active: +e.target.dataset.index,
    })
  }
  render() {
    const { active } = this.state
    const { images } = this.props

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal hero" />
        <div className="carousel-smaller">
          {images.map((pic, idx) => (
            // eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              data-index={idx}
              key={pic}
              src={pic}
              className={idx === active ? 'active' : ''}
              alt="animal thumb"
            />
          ))}
        </div>
      </div>
    )
  }
}
export default Carousel
