import React, { useState, useMemo } from "react";
import SearchFilters from "./SearchFilters";
import GigCardList from "./GigCardList";

const BrowseGigs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data - replace with API call
  const allGigs = [
    // Design & Creative (2 gigs)
    {
      id: 1,
      title: "Professional Logo Design",
      description: "I will create a unique and professional logo design that perfectly represents your brand identity.",
      price: 1500,
      category: "Design & Creative",
      freelancer: {
        name: "John Designer",
        rating: 4.9,
        reviews: 127,
        avatar: "JD"
      },
      image: "https://www.seoclerk.com/pics/000/834/682/e29993eec8a393585b726e72239cf524.jpg",
      deliveryTime: "3 days",
      revisions: 3
    },
    {
      id: 2,
      title: "UI/UX Design Package",
      description: "Complete UI/UX design for web and mobile applications with wireframes and prototypes.",
      price: 2800,
      category: "Design & Creative",
      freelancer: {
        name: "Emma Creative",
        rating: 4.8,
        reviews: 94,
        avatar: "EC"
      },
      image: "https://www.techicy.com/wp-content/uploads/2021/09/What-is-UX-and-UI-Design.jpg",
      deliveryTime: "5 days",
      revisions: 4
    },
    // Programming & Tech (2 gigs)
    {
      id: 3,
      title: "Website Development",
      description: "Full-stack website development with modern technologies and responsive design.",
      price: 5000,
      category: "Programming & Tech",
      freelancer: {
        name: "Sarah Developer",
        rating: 4.8,
        reviews: 89,
        avatar: "SD"
      },
      image: "https://www.vskills.in/certification/blog/wp-content/uploads/2022/03/Web-development.jpg",
      deliveryTime: "7 days",
      revisions: 2
    },
    {
      id: 4,
      title: "Mobile App Development",
      description: "Native iOS and Android app development with modern UI and backend integration.",
      price: 7500,
      category: "Programming & Tech",
      freelancer: {
        name: "Raj Tech",
        rating: 4.7,
        reviews: 156,
        avatar: "RT"
      },
      image: "https://www.glinfotech.net/blog/wp-content/uploads/2024/10/Mobile-App-Main-banner.jpg",
      deliveryTime: "14 days",
      revisions: 3
    },
    // Writing & Translation (2 gigs)
    {
      id: 5,
      title: "Content Writing Services",
      description: "High-quality content writing for blogs, websites, and marketing materials.",
      price: 800,
      category: "Writing & Translation",
      freelancer: {
        name: "Mike Writer",
        rating: 4.7,
        reviews: 156,
        avatar: "MW"
      },
      image: "https://quantizedsolutions.com/wp-content/uploads/2021/06/safasfasvc.png",
      deliveryTime: "2 days",
      revisions: 2
    },
    {
      id: 6,
      title: "Technical Documentation",
      description: "Professional technical writing, user manuals, and API documentation services.",
      price: 1200,
      category: "Writing & Translation",
      freelancer: {
        name: "Anna Technical",
        rating: 4.9,
        reviews: 78,
        avatar: "AT"
      },
      image: "https://clevertap.com/wp-content/uploads/2020/02/technical-documentation-post-header1.jpg",
      deliveryTime: "4 days",
      revisions: 2
    },
    // Digital Marketing (2 gigs)
    {
      id: 7,
      title: "Social Media Marketing",
      description: "Complete social media marketing strategy and content creation for your business.",
      price: 2500,
      category: "Digital Marketing",
      freelancer: {
        name: "Lisa Marketer",
        rating: 4.9,
        reviews: 203,
        avatar: "LM"
      },
      image: "https://hindipanda.com/wp-content/uploads/2018/12/What-is-Social-Media-Marketing.jpg",
      deliveryTime: "5 days",
      revisions: 3
    },
    {
      id: 8,
      title: "SEO Optimization",
      description: "Comprehensive SEO services including keyword research, on-page optimization, and link building.",
      price: 1800,
      category: "Digital Marketing",
      freelancer: {
        name: "Carlos SEO",
        rating: 4.6,
        reviews: 112,
        avatar: "CS"
      },
      image: "https://www.pngmart.com/files/7/SEO-PNG-Clipart.png",
      deliveryTime: "6 days",
      revisions: 2
    },
    // Video & Animation (2 gigs)
    {
      id: 9,
      title: "Video Animation",
      description: "Professional video animation and motion graphics for your brand.",
      price: 3500,
      category: "Video & Animation",
      freelancer: {
        name: "Alex Animator",
        rating: 4.6,
        reviews: 78,
        avatar: "AA"
      },
      image: "https://cdn.atomisystems.com/uploads/2022/08/moho-pro.webp",
      deliveryTime: "10 days",
      revisions: 2
    },
    {
      id: 10,
      title: "Video Editing & Post-Production",
      description: "Professional video editing, color grading, and post-production for all types of content.",
      price: 2200,
      category: "Video & Animation",
      freelancer: {
        name: "Sophie Editor",
        rating: 4.8,
        reviews: 145,
        avatar: "SE"
      },
      image: "https://images.squarespace-cdn.com/content/v1/6255daed6e3c9e3fdf31e305/57428960-e7f4-41bf-ad84-6a862084a71f/Post_production_LOS.jpeg",
      deliveryTime: "4 days",
      revisions: 3
    },
    // Music & Audio (2 gigs)
    {
      id: 11,
      title: "Voice Over Recording",
      description: "Professional voice over services for commercials, videos, and audio content.",
      price: 900,
      category: "Music & Audio",
      freelancer: {
        name: "Maria Voice",
        rating: 4.9,
        reviews: 167,
        avatar: "MV"
      },
      image: "https://ampedstudio.com/wp-content/uploads/2021/12/voice-recording-online.jpg",
      deliveryTime: "2 days",
      revisions: 2
    },
    {
      id: 12,
      title: "Music Production & Composition",
      description: "Original music composition and production for videos, games, and commercial use.",
      price: 1800,
      category: "Music & Audio",
      freelancer: {
        name: "David Composer",
        rating: 4.7,
        reviews: 89,
        avatar: "DC"
      },
      image: "https://www.cours-de-mao.fr/wp-content/uploads/2021/10/trouver-inspiration-composition-musicale.jpg",
      deliveryTime: "7 days",
      revisions: 3
    },
    // Business (2 gigs)
    {
      id: 13,
      title: "Business Plan Writing",
      description: "Comprehensive business plan writing with market analysis and financial projections.",
      price: 4000,
      category: "Business",
      freelancer: {
        name: "David Consultant",
        rating: 4.8,
        reviews: 95,
        avatar: "DC"
      },
      image: "https://anjitvs.in/wp-content/uploads/2023/08/business-plan-banner1-1.jpg",
      deliveryTime: "7 days",
      revisions: 3
    },
    {
      id: 14,
      title: "Financial Analysis & Modeling",
      description: "Professional financial analysis, forecasting, and Excel modeling for business decisions.",
      price: 3200,
      category: "Business",
      freelancer: {
        name: "Priya Finance",
        rating: 4.9,
        reviews: 134,
        avatar: "PF"
      },
      image: "https://enstructcorp.com/wp-content/uploads/2020/11/iStock-1094465844-scaled.jpg",
      deliveryTime: "5 days",
      revisions: 2
    }
  ];

  // Filter gigs based on search term and category
  const filteredGigs = useMemo(() => {
    return allGigs.filter(gig => {
      const matchesSearch = searchTerm === "" || 
        gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.freelancer.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || gig.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Browse Gigs</h3>
        <p className="text-gray-600">Discover amazing services from talented freelancers.</p>
      </div>
      
      <SearchFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <GigCardList filteredGigs={filteredGigs} />
    </div>
  );
};

export default BrowseGigs; 