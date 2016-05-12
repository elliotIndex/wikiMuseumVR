import React from 'react';
import Player from './Player'
import Portal from './Portal'
import TextDisplay from './TextDisplay'
import PageModel from './PageModel'
const $ = require('jquery');

class MuseumScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ajaxHtml: ''
    };
  }

  componentDidMount() {
    $.ajax({
        type: 'GET',
        url: 'https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Stegoceras&callback=?',
        contentType: 'application/json; charset=utf-8',
        async: false,
        dataType: 'json',
        success: (data, textStatus, jqXHR) => {
            const markup = data.parse.text["*"];
            this.setState({ 
              ajaxHtml: markup
            });
        },
        error: function (errorMessage) {
            console.error('Error retrieving from wikipedia:', errorMessage);
        }
    });
  }

  render () {
    return (
      <a-scene>
        <a-assets>
          <div id='exampleText'>
            YOO!!!! text here ya heard???
          </div>
          <div id='stegocerasHTML' dangerouslySetInnerHTML={{__html:this.state.ajaxHtml}}>
          </div>
          <a-asset-item id="modelDae" src="/assets/stegoceras.dae"></a-asset-item>
        </a-assets>

        <a-sky color='blue' />
        <a-plane material='color:grey;side:double' position='0 0 0' rotation='-90 0 0' width='100' height='100' />
        <Portal player='#player' position='0 0 -10' width='1.5' height='2.5' />
        <TextDisplay 
          position='-5 1.5 -5' rotation='0 20 0'
          borderThickness='0.05' borderColor='purple'
          htmlSelector='#exampleText'
        />
        <TextDisplay 
          position='-8 1 -3' rotation='0 45 0'
          height='2' width='2' depth='0.5'
          // borderThickness='0.05' 
          borderColor='purple'
          htmlSelector='#exampleText'
          htmlScale='2'
        />
        <TextDisplay 
          position='6 2.05 -8' rotation='0 -20 0'
          height='4' width='2' depth='0.5'
          borderThickness='0.05' 
          borderColor='red'
          htmlSelector='#stegocerasHTML'
          htmlScale='1'
        />
        <PageModel
          position='0 0 -4'
          modelSrc='#modelDae'
        />
        <Player/>
      </a-scene>
    );
  }
};

module.exports = MuseumScene;
