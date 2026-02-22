interface News2 {
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  author?: string;
}

type Props = {
  news: News2[];
  filtredNews: News2[];
  showStories?: boolean;
};

function NewsGrid({ showStories, filtredNews }: Props) {
  return (
    <>
      <section id="articlesection" className="">
        {showStories && (
          <h3 className="text-white font-bold">Thought-provoking stories</h3>
        )}
        <div
          id="article-containers"
          className="grid [@media(min-width:1400px)]:grid-cols-4 [@media(min-width:1050px)]:grid-cols-3 sm:grid-cols-2 gap-6 mt-7 "
        >
          {showStories &&
            (filtredNews.length > 0 ? (
              filtredNews.map(
                (i) =>
                  i.urlToImage && (
                    <div
                      key={i.url}
                      onClick={() => window.open(i.url, '_blank')} // open the link in newtab
                      className="w-75 h-72 flex flex-col shadow-black hover:shadow-xl hover:bg-[#42414D] text-white hover:text-[#08bfcc] overflow-hidden cursor-pointer items-center bg-[#42414D]/70 pb-4 rounded-3xl"
                    >
                      <img
                        src={i.urlToImage}
                        className="w-75 h-45 rounded-t-3xl"
                        alt=""
                      />
                      <p className="w-60 pt-2 text-[14px] font-semibold">
                        {i.title.slice(0, 60) + '...'}
                      </p>
                      <p className="relative w-40 right-12 top-4 text-gray-300 font-light text-sm">
                        {i.author?.includes('https') ? '' : i.author}
                      </p>
                    </div>
                  )
              )
            ) : (
              <div className="bg-gray-600 px-15 p-10 rounded-2xl">
                <h1 className="text-white font-bold">No Stories found</h1>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default NewsGrid;
