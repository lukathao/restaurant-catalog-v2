export const getStaticPaths = async (context) => {
  const slugQuery = await request({
    query: PATHS_QUERY,
    preview: context.preview,
  });
  const paths = slugQuery.allPages.map(path => { params: { slug: path.slug } });
  return {
    paths,
    fallback: false,
  };
};
