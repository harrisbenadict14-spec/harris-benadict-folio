import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

// 1. Define the exact shape and rules of your form
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Your message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  // 2. Initialize the form with the Zod resolver
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(formSchema)
  });

  // 3. Handle submission
  const onSubmit = async (data: ContactFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    console.log("Form Data:", data);
    toast.success("Thanks for reaching out! I'll get back to you soon.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md w-full">
      <div>
        <input 
          {...register('name')} 
          placeholder="Your Name" 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
        />
        {errors.name && <span className="text-destructive text-xs mt-1">{errors.name.message}</span>}
      </div>
      <div>
        <input 
          {...register('email')} 
          placeholder="you@example.com" 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
        />
        {errors.email && <span className="text-destructive text-xs mt-1">{errors.email.message}</span>}
      </div>
      <div>
        <textarea 
          {...register('message')} 
          placeholder="What's on your mind?" 
          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none" 
        />
        {errors.message && <span className="text-destructive text-xs mt-1">{errors.message.message}</span>}
      </div>
      <button 
        disabled={isSubmitting} 
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}