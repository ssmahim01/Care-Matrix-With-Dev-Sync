import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';

function EmergencyCard() {
  const phoneNumber = '123-456-7890'; 
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="mb-6 w-full max-w-md space-y-2">
      <div className="flex justify-between text-sm">
        <span>Estimated arrival time:</span>
        <span className="font-medium">5 minutes</span>
      </div>
      <Progress value={20} className="h-2" />
      <p className="text-xs text-muted-foreground">Ambulance is en route to your location</p>
      
      {/* Phone Number Section */}
      <div className="mt-2 space-y-1 flex justify-between items-center">
        <div className="flex justify-start gap-4 text-sm">
          <span>Contact:</span>
          <span className="font-medium">{phoneNumber}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            variant={"ghost"}
            className="text-sm hover:bg-slate-200 transition-all duration-300 ease-in-out px-2 py-1 rounded"
          >
            <span className='transition-all duration-300 ease-in-out'>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <a
            href={`tel:${phoneNumber}`}
            className="text-sm hover:bg-slate-200 transition-all duration-300 ease-in-out px-2 py-1 rounded"
          >
            Call
          </a>
        </div>
      </div>
    </div>
  );
}

export default EmergencyCard;