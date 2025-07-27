import { Link } from 'wouter';

import { Button } from "@/components/ui/button";


/**
 * Specialized button component for reporting items as lost
 * Simple navigation button that routes to the lost page
 * @param {Object} props - Component props
 * @param {string} props.hash - Item hash for routing
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether button should be disabled
 */
export default function LostButton({ hash, className = "flex-1", disabled = false }) {
    return (
        <Button 
            variant="outline" 
            className={className} 
            disabled={disabled}
            asChild
        >
            <Link to={`/lost/${hash}`}>Lost</Link>
        </Button>
    );
}
