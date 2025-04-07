interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  centered?: boolean;
  fullHeight?: boolean;
  overlay?: boolean;
}

const sizes = {
  sm: {
    size: 'w-6 h-6 border-2'
  },
  md: {
    size: 'w-10 h-10 border-3'
  },
  lg: {
    size: 'w-16 h-16 border-4'
  }
};

export default function Spinner({ 
  size = 'md', 
  centered = false, 
  fullHeight = false,
  overlay = false
}: SpinnerProps) {
  // Simple spinning circle
  const sizeConfig = sizes[size] || sizes.md;
  
  const spinner = (
    <div className={`${sizeConfig.size} rounded-full border-solid border-[#00B2FF] border-t-transparent animate-spin`}>
    </div>
  );
  
  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }
  
  if (centered) {
    return (
      <div className={`flex flex-col items-center justify-center ${fullHeight ? 'min-h-[60vh]' : ''}`}>
        {spinner}
      </div>
    );
  }
  
  return spinner;
}