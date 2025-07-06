import { Label } from "./label";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { Alert, AlertDescription } from "./alert";
import { MapPin, DollarSign, MessageSquare } from "lucide-react";
import { cn } from "@/app/lib/utils";

export function FormField({ 
  label, 
  id, 
  error, 
  required = false, 
  children, 
  className,
  ...props 
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      {children}
      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertDescription className="text-sm">
            {error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export function LocationField({ value, onChange, error, ...props }) {
  return (
    <FormField 
      label="Location" 
      id="location" 
      error={error}
      required
      {...props}
    >
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          id="location"
          type="text"
          placeholder="Where was this item lost?"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 retro-input"
        />
      </div>
    </FormField>
  );
}

export function RewardField({ value, onChange, error, ...props }) {
  return (
    <FormField 
      label="Reward (ETH)" 
      id="reward" 
      error={error}
      {...props}
    >
      <div className="relative">
        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          id="reward"
          type="number"
          step="0.001"
          min="0"
          placeholder="0.001"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 retro-input"
        />
      </div>
    </FormField>
  );
}

export function DescriptionField({ value, onChange, error, ...props }) {
  return (
    <FormField 
      label="Description" 
      id="description" 
      error={error}
      required
      {...props}
    >
      <div className="relative">
        <MessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4 z-10" />
        <Textarea
          id="description"
          placeholder="Describe the item..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 min-h-[80px] resize-none retro-input"
        />
      </div>
    </FormField>
  );
}

export function SubmitButton({ 
  children, 
  isLoading = false, 
  disabled = false, 
  className,
  ...props 
}) {
  return (
    <Button 
      type="submit"
      disabled={disabled || isLoading}
      className={cn("w-full retro-button", className)}
      {...props}
    >
      {isLoading ? "Processing..." : children}
    </Button>
  );
}