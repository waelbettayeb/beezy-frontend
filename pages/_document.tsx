import * as React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { Provider as StyletronProvider } from "styletron-react";
import { Server, Sheet } from "styletron-engine-atomic";
import { styletron } from "../styletron";

class MyDocument extends Document<{ stylesheets: Sheet[] }> {
  static async getInitialProps(props: any) {
    const initialProps = await Document.getInitialProps(props);
    const page = props.renderPage((App: any) => (props: any) => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ));
    const stylesheets = (styletron as Server).getStylesheets() || [];
    return { ...initialProps, ...page, stylesheets };
  }

  render() {
    return (
      <html>
        <Head>
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs["data-hydrate"]}
              key={i}
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
