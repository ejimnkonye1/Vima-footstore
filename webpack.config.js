// webpack.config.js

module.exports = {
    // ... other configurations
    module: {
      rules: [
        // ... other rules
        {
          test: /\.(png|jpg|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images/', // Adjust the output path as needed
              },
            },
          ],
        },
      ],
    },
  };
  