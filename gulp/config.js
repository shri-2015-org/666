const dest = './build';
const src = './source';
const stat = './static';

module.exports = {
  source: src,
  webpack: {
    ip: '0.0.0.0',
    port: 8080
  },
  images: {
    src: src + '/img/**/**',
    dest: dest + '/img'
  },
  files: {
    stat: stat,
    src: stat + '/**/*',
    dest: dest,
  },
  iconFonts: {
    name: 'mvideo_-_icons',
    src: src + '/icons/*.svg',
    dest: src + '/fonts',
    scssDest: src + '/scss/components',
    template: './gulp/tasks/iconFont/template.scss.swig',
    scssOutputName: '_icons.scss',
    fontPath: '../build/fonts',
    className: 'icon',
    options: {
      fontName: 'mvideo_-_icons',
      normalize: true,
      appendCodepoints: true
    }
  },
};
