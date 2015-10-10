export const EMOJI_REGEX = /\:([a-z0-9_+-]+)?\:/g;

export default function emoji(text) {
  return text.replace(EMOJI_REGEX, match => {
    const id = match.replace(/\:?/g, '');
    return `![${ match }]( //assets-cdn.github.com/images/icons/emoji/${ id }.png)`;
  });
}
