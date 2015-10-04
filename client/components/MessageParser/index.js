import { EMOJI_REGEX, EMOJI_IMAGES } from '../../../common/emoji';
import marked from 'marked';

const renderer = new marked.Renderer();
renderer.link = function parseLink( href, title, text ) {
  return `<a target="_blank" href="${ href }" title="${ title }">${ text }</a>`;
};

class MessageParser {
  constructor() {
    this.text = '';
    this.result = '';
  }

  process(text = '') {
    this.text = text;
    this.result = text;
    return this;
  }

  md() {
    this.result = marked(this.result, { sanitize: true, breaks: true, renderer: renderer });
    return this;
  }

  emoji() {
    this.result = this.result.replace(EMOJI_REGEX, function parseEmoji(emoji) {
      const src = EMOJI_IMAGES[emoji.replace(/\:?/g, '')];

      return !src ? emoji : `![]( ${ src })`;
    });
    return this;
  }
}

export default new MessageParser();
