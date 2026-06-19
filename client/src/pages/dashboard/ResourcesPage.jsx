import React, { useEffect, useState } from 'react';
import { BookOpen, Search, ExternalLink, Play, Book, FileText, Compass, HelpCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import Loader from '../../components/common/Loader';
import api from '../../lib/api';

const MOCK_RESOURCES = [
  { id: 1, title: 'Deep Work: Rules for Focused Success', category: 'Soft Skills', type: 'Book', platform: 'Amazon', url: '#', duration: '300 pages' },
  { id: 2, name: 'Designing Data-Intensive Applications', title: 'Designing Data-Intensive Applications', category: 'Technical', type: 'Book', platform: 'O\'Reilly', url: '#', duration: '500 pages' },
  { id: 3, title: 'Ultimate React Framework Guide (Next.js)', category: 'Technical', type: 'Video', platform: 'YouTube', url: '#', duration: '2.5 hours' },
  { id: 4, title: 'Introduction to Cloud Architectures', category: 'Technical', type: 'Course', platform: 'Coursera', url: '#', duration: '12 hours' },
  { id: 5, title: 'How to Speak: Communication Lectures', category: 'Soft Skills', type: 'Video', platform: 'MIT', url: '#', duration: '1 hour' },
  { id: 6, title: 'Product Design Fundamentals', category: 'Design', type: 'Course', platform: 'Interaction Design', url: '#', duration: '8 hours' }
];

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await api.get('/resources');
      if (res && Array.isArray(res.data) && res.data.length > 0) {
        setResources(res.data);
      } else {
        setResources(MOCK_RESOURCES);
      }
    } catch (error) {
      console.warn('API error (using fallback resources):', error);
      setResources(MOCK_RESOURCES);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Video': return Play;
      case 'Book': return Book;
      case 'Article': return FileText;
      default: return BookOpen;
    }
  };

  const categories = ['All', 'Technical', 'Soft Skills', 'Design'];

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || res.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <Loader fullScreen text="Loading resources library..." />;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in font-body">
      {/* Title */}
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface mb-2">Learning Resources</h1>
        <p className="text-body-md text-on-surface-variant">
          Access curated videos, books, articles, and courses recommended by the AI to close your skill gaps.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="w-full md:max-w-xs">
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
        </div>
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-label-sm font-semibold transition-all border outline-none
                ${activeCategory === cat 
                  ? 'bg-primary border-transparent text-on-primary shadow-glow-teal' 
                  : 'bg-surface-container-low border-outline-variant/10 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <Card className="text-center py-12" glass>
          <HelpCircle className="w-12 h-12 text-on-surface-variant/40 mx-auto mb-4" />
          <h3 className="text-headline-sm font-bold text-on-surface mb-1">No resources found</h3>
          <p className="text-body-md text-on-surface-variant">Try adjusting your search criteria or categories.</p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => {
            const Icon = getIcon(res.type);
            return (
              <Card key={res.id} hoverEffect className="flex flex-col justify-between h-[210px]" glass>
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-label-sm text-on-surface-variant/80 font-bold uppercase tracking-wider">{res.category}</span>
                    <Badge variant={res.type === 'Video' ? 'primary' : res.type === 'Book' ? 'secondary' : 'default'} className="py-0 px-2 text-[10px]">
                      {res.type}
                    </Badge>
                  </div>
                  <h3 className="text-body-lg font-bold text-on-surface line-clamp-2 mb-2 leading-snug">{res.title}</h3>
                </div>
                
                <div className="mt-auto border-t border-outline-variant/10 pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-label-sm text-on-surface-variant/90 font-semibold">
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <span>{res.platform} • {res.duration}</span>
                  </div>
                  <a
                    href={res.url}
                    className="p-1 text-primary hover:text-on-surface hover:bg-primary/10 rounded transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${res.title}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
