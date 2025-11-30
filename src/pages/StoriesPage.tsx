import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Clock, Edit2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface Story {
    id: string;
    title: string;
    thumbnailUrl?: string;
    updatedAt: string;
}

export const StoriesPage: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Mock fetch stories
        const fetchStories = async () => {
            setIsLoading(true);
            try {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mock data
                const mockStories: Story[] = [
                    {
                        id: '1',
                        title: 'Summer Vibes',
                        thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
                        updatedAt: new Date().toISOString(),
                    },
                    {
                        id: '2',
                        title: 'Monday Motivation',
                        updatedAt: new Date(Date.now() - 86400000).toISOString(),
                    },
                    {
                        id: '3',
                        title: 'Product Launch',
                        thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
                        updatedAt: new Date(Date.now() - 172800000).toISOString(),
                    },
                ];
                setStories(mockStories);
            } catch (error) {
                console.error('Failed to fetch stories', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStories();
    }, []);

    return (
        <div className="p-6 md:p-10 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Stories</h1>
                    <p className="text-gray-500 mt-1">Manage and edit your saved stories</p>
                </div>
                <Button onClick={() => navigate('/studio')} icon={<Plus className="w-5 h-5" />}>
                    Create New
                </Button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-[9/16] bg-gray-100 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : stories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {stories.map((story) => (
                        <div
                            key={story.id}
                            className="group relative aspect-[9/16] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            {story.thumbnailUrl ? (
                                <img
                                    src={story.thumbnailUrl}
                                    alt={story.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center">
                                    <span className="text-4xl">🎨</span>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <h3 className="text-white font-bold text-lg truncate">{story.title}</h3>
                                <div className="flex items-center text-white/80 text-xs mt-1 mb-3">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {new Date(story.updatedAt).toLocaleDateString()}
                                </div>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="w-full bg-white/90 hover:bg-white border-none"
                                    onClick={() => navigate(`/studio?storyId=${story.id}`)}
                                    icon={<Edit2 className="w-3 h-3" />}
                                >
                                    Edit Story
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                        <Plus className="w-10 h-10 text-indigo-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No stories yet</h3>
                    <p className="text-gray-500 max-w-sm mb-6">
                        Create your first story to share with the world. It only takes a few seconds!
                    </p>
                    <Button onClick={() => navigate('/studio')}>Start Creating</Button>
                </div>
            )}
        </div>
    );
};
