import React, { useState, useMemo } from "react";
import SearchFilters from "./SearchFilters";
import GigCardList from "./GigCardList";

const BrowseGigs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter gigs based on search term and category
  const filteredGigs = useMemo(() => {
    // Mock data - replace with API call
    const allGigs = [
      {
        id: 1,
        title: "Professional Logo Design",
        description: "Create a unique and memorable logo for your brand with professional design principles.",
        price: 1500,
        category: "DESIGN",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500",
        freelancer: { id: "freelancer_1", name: "John Designer", avatar: "JD", rating: 4.8, reviews: 127 }
      },
      {
        id: 2,
        title: "Website Development",
        description: "Full-stack website development with modern technologies and responsive design.",
        price: 5000,
        category: "WEB DEVELOPMENT",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
        freelancer: { id: "freelancer_2", name: "Sarah Developer", avatar: "SD", rating: 4.9, reviews: 89 }
      },
      {
        id: 3,
        title: "Content Writing Services",
        description: "High-quality content writing for blogs, websites, and marketing materials.",
        price: 800,
        category: "WRITING",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500",
        freelancer: { id: "freelancer_3", name: "Mike Writer", avatar: "MW", rating: 4.7, reviews: 203 }
      },
      {
        id: 4,
        title: "UI/UX Design Package",
        description: "Complete UI/UX design package including wireframes, prototypes, and final designs.",
        price: 2800,
        category: "DESIGN",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500",
        freelancer: { id: "freelancer_4", name: "Emma Creative", avatar: "EC", rating: 4.8, reviews: 156 }
      },
      {
        id: 5,
        title: "Mobile App Development",
        description: "Native and cross-platform mobile app development for iOS and Android.",
        price: 8000,
        category: "MOBILE DEVELOPMENT",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500",
        freelancer: { id: "freelancer_5", name: "Alex Mobile", avatar: "AM", rating: 4.9, reviews: 78 }
      },
      {
        id: 6,
        title: "Digital Marketing Strategy",
        description: "Comprehensive digital marketing strategy including SEO, social media, and PPC.",
        price: 2000,
        category: "MARKETING",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
        freelancer: { id: "freelancer_6", name: "Lisa Marketing", avatar: "LM", rating: 4.6, reviews: 92 }
      }
    ];

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