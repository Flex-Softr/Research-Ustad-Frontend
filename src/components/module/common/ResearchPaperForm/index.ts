// Main form component
export { default as ResearchPaperForm } from './ResearchPaperForm';

// Sub-components
export { default as FormHeader } from './FormHeader';
export { default as BasicInfoFields } from './BasicInfoFields';
export { default as AuthorsSection } from './AuthorsSection';
export { default as AdditionalFields } from './AdditionalFields';
export { default as KeywordsSection } from './KeywordsSection';
export { default as FormActions } from './FormActions';
export { default as LoadingState } from './LoadingState';
export { default as AuthorSearchDropdown } from './author-search-dropdown';

// Types and hooks
export * from './types';
export { useResearchPaperForm } from './useResearchPaperForm';
