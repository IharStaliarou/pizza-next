'use client';

import React from 'react';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';

import { Api } from '@/services/api.client';
import { IStory } from '@/services/stories';
import { Container } from '../Container/Container';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();

  React.useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };
  return (
    <>
      <Container
        className={cn(
          'flex items-center justify-between gap-2 my-10',
          className
        )}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className='w-[200px] h-[300px] bg-gray-200 rounded-md animate-pulse'
            />
          ))}

        {stories.map((story, i) => (
          <img
            key={story.id}
            onClick={() => onClickStory(story)}
            className='rounded-md cursor-pointer'
            src={story.previewImageUrl}
            style={{ objectFit: 'cover', height: 300, width: 200 }}
          />
        ))}

        {open && (
          <div className='absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30'>
            <div className='relative' style={{ width: 520 }}>
              <button
                className='absolute -right-10 -top-5 z-30'
                onClick={() => setOpen(false)}
              >
                <X className='absolute top-0 right-0 w-8 h-8 text-white/50' />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={
                  selectedStory?.items.map((item, i) => ({
                    url: item.sourceUrl,
                  })) || []
                }
                defaultInterval={3000}
                width={520}
                height={800}
                storyStyles={{
                  width: 520,
                  height: 800,
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
