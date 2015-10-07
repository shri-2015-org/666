import marked from 'marked';

const renderer = new marked.Renderer();
renderer.link = function parseLink( href, title, text ) {
  return `<a target="_blank" href="${ href }" title="${ title }">${ text }</a>`;
};

const options = {
  sanitize: true,
  breaks: true,
  renderer,
};

export default text => marked(text, options);
