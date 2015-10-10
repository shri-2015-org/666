import marked from 'marked';

const renderer = new marked.Renderer();
renderer.link = ( href, title, text ) => {
  return `<a target="_blank" href="${ href }" title="${ title }">${ text }</a>`;
};

renderer.image = ( href, title, text ) => {
  let html = `<object data="${ href }"`;
  if (title) {
    html += ` title="${ title }"`;
  }
  if (/emoji/.test(href)) {
    html += ' class="md-emoji"';
  }
  return html + `>${ text }</object>`;
};

export default text => marked(text, {
  sanitize: true,
  breaks: true,
  renderer,
});
