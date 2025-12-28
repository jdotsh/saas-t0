import { Card, CardHeader, CardContent } from '@/components/ui/card-header';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { testimonials } from '@/config/testimonials';

export default function Testimonials() {
  const groupedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 4) {
    groupedTestimonials.push(testimonials.slice(i, i + 4));
  }

  return (
    <div className="relative flex flex-col items-center justify-center max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-20 mx-auto">
      <div className="flex items-center w-full mb-8 sm:mb-10 md:mb-12">
        <div className="hidden sm:block flex-grow border-t border-gray-300"></div>
        <div className="flex-shrink px-0 sm:px-4 text-center w-full sm:w-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Testimonials
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            What everyone else is saying
          </p>
        </div>
        <div className="hidden sm:block flex-grow border-t border-gray-300"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {groupedTestimonials.map((group, groupIndex) => (
          <div key={groupIndex} className="flex flex-col gap-4 sm:gap-6">
            {group.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="flex flex-row items-center bg-zinc-100 dark:bg-zinc-800 p-3 sm:p-4 rounded-t-xl">
                  <div className="flex items-center">
                    <Avatar className="size-8 sm:size-9 mr-2 sm:mr-3">
                      <AvatarImage
                        src={testimonial.avatarImg}
                        className="h-full w-full"
                      />
                      <AvatarFallback className="h-full w-full text-xs">
                        {testimonial.avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold truncate">
                        {testimonial.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 text-xs sm:text-sm">
                  <p className="leading-relaxed">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
