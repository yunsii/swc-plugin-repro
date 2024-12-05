import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createCache();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          (
            <StyleProvider cache={cache}>
              <App {...props} />
            </StyleProvider>
          ),
      });

    const initialProps = await Document.getInitialProps(ctx);
    const antdStyles = extractStyle(cache, true);

    return {
      ...initialProps,
      antdStyles,
    };
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { antdStyles } = this.props as any;

    return (
      <Html lang="en">
        <Head>
          {antdStyles && <style type="text/css" id="extract-styles" dangerouslySetInnerHTML={{ __html: antdStyles }} />}
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
