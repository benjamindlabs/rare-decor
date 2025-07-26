const instagramPosts = [
  {
    id: 1,
    image: "/lovable-uploads/e85212de-a244-40e4-bcf6-ea0a40ddb55a.png",
    likes: 532,
    comments: 24,
    link: "https://instagram.com"
  },
  {
    id: 2,
    image: "/lovable-uploads/3715ffc9-60de-482a-9383-2dcc463f150e.png",
    likes: 847,
    comments: 42,
    link: "https://instagram.com"
  },
  {
    id: 3,
    image: "/lovable-uploads/8b136831-bf1a-4344-b2c6-3eaa746511a6.png",
    likes: 621,
    comments: 31,
    link: "https://instagram.com"
  },
  {
    id: 4,
    image: "/lovable-uploads/0073d9b1-b3f4-476b-be2e-67b1e8b45d21.png",
    likes: 738,
    comments: 18,
    link: "https://instagram.com"
  },
  {
    id: 5,
    image: "/lovable-uploads/1e8539ba-e979-48f0-9617-5528d9e8a5f7.png",
    likes: 925,
    comments: 56,
    link: "https://instagram.com"
  },
  {
    id: 6,
    image: "/lovable-uploads/f0b98ec2-e114-4a0f-9441-401a1fc1a0f4.png",
    likes: 514,
    comments: 27,
    link: "https://instagram.com"
  }
];

export default function InstagramFeed() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm uppercase tracking-wider text-foreground/70 mb-4">Instagram</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-medium mb-4">@rarehome</h3>
          <p className="text-foreground/70">Follow us for style inspiration and exclusive content</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <a 
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="overflow-hidden group aspect-square premium-card"
            >
              <div className="relative h-full w-full">
                <img 
                  src={post.image} 
                  alt="Instagram Post" 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-sm flex items-center space-x-4">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {post.likes}
                    </span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
