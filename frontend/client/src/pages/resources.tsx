import { BottomNav, Header } from "@/components/layout";
import { SAMPLE_RESOURCES, RESOURCE_CATEGORIES, RESOURCE_TYPES } from "@/lib/resources-data";
import { Download, FileText, Headphones, Search, Video, Link2, Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());

  const filteredResources = SAMPLE_RESOURCES.filter((resource) => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesType = selectedType === "all" || resource.resource_type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredResources = filteredResources.filter(r => r.featured).slice(0, 3);
  const regularResources = filteredResources.filter(r => !r.featured);

  const toggleBookmark = (id: number) => {
    setBookmarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return <Headphones className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'link':
        return <Link2 className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const ResourceCard = ({ resource, featured = false }: { resource: typeof SAMPLE_RESOURCES[0], featured?: boolean }) => (
    <Card className={`${featured ? 'border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10' : 'border'} hover:shadow-md transition-shadow`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Icon/Thumbnail */}
          <div className={`h-14 w-14 rounded-lg flex items-center justify-center shrink-0 ${
            resource.resource_type === 'audio' ? 'bg-orange-100 text-orange-600' :
            resource.resource_type === 'video' ? 'bg-purple-100 text-purple-600' :
            resource.resource_type === 'link' ? 'bg-green-100 text-green-600' :
            'bg-blue-100 text-blue-600'
          }`}>
            {getResourceIcon(resource.resource_type)}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-foreground text-sm leading-snug mb-1">
                  {resource.title}
                </h3>
                {featured && (
                  <Badge variant="secondary" className="text-[9px] mb-1">⭐ Featured</Badge>
                )}
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="shrink-0 h-8 w-8"
                onClick={() => toggleBookmark(resource.id)}
              >
                {bookmarked.has(resource.id) ? (
                  <BookmarkCheck className="h-4 w-4 text-primary fill-primary" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
              {resource.description}
            </p>
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-2 mb-3 text-[10px]">
              <Badge variant="outline" className="text-[10px]">
                {RESOURCE_CATEGORIES.find(c => c.value === resource.category)?.icon} {RESOURCE_CATEGORIES.find(c => c.value === resource.category)?.label}
              </Badge>
              {resource.file_size && (
                <span className="text-muted-foreground">{resource.file_size}</span>
              )}
              {resource.duration && (
                <span className="text-muted-foreground">⏱️ {resource.duration}</span>
              )}
              <span className="text-muted-foreground">📥 {resource.download_count.toLocaleString()}</span>
            </div>
            
            {resource.author && (
              <p className="text-[10px] text-muted-foreground mb-2">By {resource.author}</p>
            )}
            
            {/* Tags */}
            {resource.tags_list && resource.tags_list.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {resource.tags_list.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[9px] font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Actions */}
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 h-8 text-xs">
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
              {resource.resource_type === 'link' && (
                <Button size="sm" variant="outline" className="h-8">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="mobile-container pb-20 bg-gradient-to-br from-background via-background to-secondary/20">
      <Header title="Resource Library" />
      
      <main className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search resources..." 
            className="pl-9 bg-card"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {RESOURCE_CATEGORIES.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {RESOURCE_TYPES.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-foreground px-1">Featured Resources</h2>
            {featuredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} featured />
            ))}
          </div>
        )}

        {/* All Resources */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-foreground">
              All Resources ({regularResources.length})
            </h2>
            <Button variant="ghost" size="sm" className="text-xs h-7">
              <Bookmark className="h-3 w-3 mr-1" />
              Bookmarks
            </Button>
          </div>
          
          {regularResources.length > 0 ? (
            regularResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))
          ) : (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No resources found</p>
                <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters or search</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
