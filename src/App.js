import React from "react";
import "./App.css";

class ClapTyper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      emoji: "👏",
    };
  }

  componentDidMount() {
    try {
      window.twttr.widgets.load();
    } catch (err) {
      // ignore errors
    }
  }

  _onChange(text) {
    this.setState({ text });
  }

  _onSelectChange(emoji) {
    this.setState({ emoji });
    this.updateFaviconAndTitle(emoji);
  }

  _clap(text) {
    return text.split(/\s+/).join(` ${this.state.emoji} `);
  }

  faviconTemplate(icon) {
    return `
    <svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22>
      <text y=%22.9em%22 font-size=%2290%22>
        ${icon}
      </text>
    </svg>
  `.trim();
  }

  updateFaviconAndTitle(emoji) {
    const linkForFavicon = document.querySelector(`head > link[rel='icon']`);
    const newFavicon = this.faviconTemplate(emoji);
    linkForFavicon.setAttribute(`href`, `data:image/svg+xml,${newFavicon}`);
    document.title = `Clap ${emoji} Typer`;
  }

  render() {
    return (
      <div>
        <h1>Clap {this.state.emoji} Typer</h1>
        <input
          type="text"
          placeholder="type shit here"
          onChange={(e) => this._onChange(e.target.value)}
        />
        <br />
        <select
          value={this.state.emoji}
          onChange={(e) => this._onSelectChange(e.target.value)}
        >
          <option value="👏">👏</option>
          <option value="👏🏻">👏🏻</option>
          <option value="👏🏼">👏🏼</option>
          <option value="👏🏽">👏🏽</option>
          <option value="👏🏾">👏🏾</option>
          <option value="👏🏿">👏🏿</option>
        </select>
        <br />
        <textarea rows="10" value={this._clap(this.state.text)}></textarea>
      </div>
    );
  }
}

export default ClapTyper;
