const ignore = () => {
  const extensions = ['.css', '.scss', '.less', '.png', '.jpg', '.gif'];
  for (let i = 0, len = extensions.length; i < len; i += 1) {
    require.extensions[extensions[i]] = () => {
      return false;
    };
  }
};
module.exports = ignore;
