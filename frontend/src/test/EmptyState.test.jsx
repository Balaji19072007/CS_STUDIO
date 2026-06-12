import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyState from '../components/common/EmptyState';

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(<EmptyState title="No courses found" description="Try adjusting your filters." />);
    expect(screen.getByText('No courses found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your filters.')).toBeInTheDocument();
  });

  it('renders default values when no props given', () => {
    render(<EmptyState />);
    expect(screen.getByText('No data found')).toBeInTheDocument();
    expect(screen.getByText('There is nothing here yet.')).toBeInTheDocument();
  });

  it('renders action element when provided', () => {
    render(<EmptyState action={<button>Retry</button>} />);
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<EmptyState className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
