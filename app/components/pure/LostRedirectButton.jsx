import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

/**
 * Redirect button component for navigating to the Lost page
 * Used in ItemActions to allow users to report items as lost
 * @param {Object} props - Component props
 * @param {string} props.hash - Item hash for routing
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether button should be disabled
 */
export default function LostRedirectButton({ hash, className = "flex-1", disabled = false }) {
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
