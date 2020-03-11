import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import Link from 'next/link';

import StoryList from '../components/StoryList';
import Layout from '../components/Layout';

class Index extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let stories;
    let page;
    try {
      page = +query.page || 1;
      const response = await fetch(
        `https://node-hnapi.herokuapp.com/news?page=${page}`,
      );

      stories = await response.json();
    } catch (error) {
      console.log(error);
      stories = [];
    }
    return { stories, page };
  }

  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('Service worker registration successful', registration);
        })
        .catch(err => {
          console.log('service worker registration failed', err);
        });
    }
  }

  render() {
    const { stories, page } = this.props;
    if (stories.length === 0) {
      return <Error statusCode={503} />;
    }
    return (
      <Layout
        title='Hacker Next'
        description='A hacker News Clone Website built with Next.js'
      >
        <StoryList stories={stories} />
        <footer>
          {page > 1 && (
            <Link href={`/?page=${page - 1}`}>
              <a>Previous Page ({page - 1})</a>
            </Link>
          )}
          <Link href={`/?page=${page + 1}`}>
            <a>Next Page ({page + 1})</a>
          </Link>
        </footer>
        <style jsx>{`
          footer {
            padding: 1em;
          }
          footer a {
            font-weight: bold;
            color: black;
            text-decoration: none;
            margin-right: 1em;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Index;
