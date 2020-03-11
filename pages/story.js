import fetch from 'isomorphic-fetch';
import Error from 'next/error';

import Layout from '../components/Layout';

class Story extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let story;
    try {
      console.log(query);
      const storyId = query.id;
      console.log('STORY JE', storyId);
      const response = await fetch(
        `https://node-hnapi.herokuapp.com/item/${storyId}`,
      );
      story = await response.json();
    } catch (error) {
      console.log(error);
      story = null;
    }

    return { story };
  }

  render() {
    const { story } = this.props;

    if (!story) {
      return <Error statusCode={503} />;
    }
    return (
      <Layout title={story.title} description={story.title} backButton={true}>
        <main>
          <h1 className='story-title'>
            <a href={story.url}>{story.title}</a>
          </h1>
          <div className='story-details'>
            <strong>{story.points} points</strong>
            <strong>{story.comments_count} comments</strong>
            <strong>{story.time_ago} posted ago...</strong>
          </div>
        </main>
        <style jsx>{`
          main {
            padding: 1em;
          }
          .story-title {
            font-size: 1rem;
            font-weight: 300;
            padding-bottom: 0.5em;
            margin: 0;
          }
          .story-title a {
            color: #333;
            text-decoration: none;
          }
          .story-title a {
            text-decoration: underline;
          }
          .story-details {
            font-size: 0.8rem;
            padding-bottom: 1em;
            border-bottom: 1px solid rgba(0.1);
            margin-bottom: 1em;
          }
          .story-details strong {
            margin-right: 1em !important;
          }
          .story-details a {
            color: #f60;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Story;
