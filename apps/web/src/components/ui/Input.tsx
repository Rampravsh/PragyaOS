import React from 'react';

// Common helper interface for labels
export interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Standard TextInput Component
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    FormFieldProps {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, type = 'text', id, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-label font-body font-semibold text-text-primary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`w-full bg-surface text-text-primary border border-border px-3.5 py-2.5 rounded-paper font-body text-body shadow-button transition-colors focus:border-accent-gold/60 focus:outline-none placeholder-text-muted/65 disabled:opacity-50 disabled:cursor-not-allowed ${
            error ? 'border-danger focus:border-danger' : ''
          } ${className}`}
          {...props}
        />
        {error && <span className="text-caption text-danger font-medium">{error}</span>}
        {!error && helperText && <span className="text-caption text-text-muted">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Textarea Component
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    FormFieldProps {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || React.useId();
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label htmlFor={textareaId} className="text-label font-body font-semibold text-text-primary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full bg-surface text-text-primary border border-border px-3.5 py-2.5 rounded-paper font-body text-body shadow-button min-h-[100px] transition-colors focus:border-accent-gold/60 focus:outline-none placeholder-text-muted/65 disabled:opacity-50 disabled:cursor-not-allowed ${
            error ? 'border-danger focus:border-danger' : ''
          } ${className}`}
          {...props}
        />
        {error && <span className="text-caption text-danger font-medium">{error}</span>}
        {!error && helperText && <span className="text-caption text-text-muted">{helperText}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

/**
 * Custom Dropdown Select Component
 */
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    FormFieldProps {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', label, error, helperText, id, children, ...props }, ref) => {
    const selectId = id || React.useId();
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label htmlFor={selectId} className="text-label font-body font-semibold text-text-primary">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            className={`w-full appearance-none bg-surface text-text-primary border border-border pl-3.5 pr-10 py-2.5 rounded-paper font-body text-body shadow-button transition-colors focus:border-accent-gold/60 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
              error ? 'border-danger focus:border-danger' : ''
            } ${className}`}
            {...props}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-muted">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        {error && <span className="text-caption text-danger font-medium">{error}</span>}
        {!error && helperText && <span className="text-caption text-text-muted">{helperText}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';

/**
 * Checkbox Component
 */
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const checkboxId = id || React.useId();
    return (
      <div className="flex flex-col space-y-1">
        <label htmlFor={checkboxId} className="inline-flex items-center cursor-pointer select-none font-body text-body text-text-primary">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={`sr-only peer disabled:opacity-50`}
            {...props}
          />
          <div className="w-5 h-5 rounded bg-surface border border-border mr-2.5 shadow-button flex items-center justify-center transition-colors peer-checked:bg-text-primary peer-checked:border-text-primary peer-focus-visible:outline-2 peer-focus-visible:outline-accent-gold shrink-0">
            <svg
              className="w-3.5 h-3.5 text-background fill-none stroke-current stroke-3 opacity-0 transition-opacity peer-checked:opacity-100"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          {label && <span className="font-semibold text-text-secondary">{label}</span>}
        </label>
        {error && <span className="text-caption text-danger font-medium ml-7.5">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

/**
 * Radio Input Component
 */
export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const radioId = id || React.useId();
    return (
      <div className="flex flex-col space-y-1">
        <label htmlFor={radioId} className="inline-flex items-center cursor-pointer select-none font-body text-body text-text-primary">
          <input
            ref={ref}
            id={radioId}
            type="radio"
            className="sr-only peer disabled:opacity-50"
            {...props}
          />
          <div className="w-5 h-5 rounded-full bg-surface border border-border mr-2.5 shadow-button flex items-center justify-center transition-colors peer-checked:border-text-primary peer-focus-visible:outline-2 peer-focus-visible:outline-accent-gold shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-text-primary scale-0 transition-transform peer-checked:scale-100" />
          </div>
          {label && <span className="font-semibold text-text-secondary">{label}</span>}
        </label>
        {error && <span className="text-caption text-danger font-medium ml-7.5">{error}</span>}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

/**
 * Toggle Switch Component
 */
export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const toggleId = id || React.useId();
    return (
      <div className="flex flex-col space-y-1">
        <label htmlFor={toggleId} className="inline-flex items-center cursor-pointer select-none font-body text-body text-text-primary">
          <input
            ref={ref}
            id={toggleId}
            type="checkbox"
            className="sr-only peer"
            {...props}
          />
          <div className="w-10 h-6 bg-border rounded-full mr-2.5 shadow-button relative transition-colors peer-checked:bg-text-primary peer-focus-visible:outline-2 peer-focus-visible:outline-accent-gold shrink-0">
            <div className="w-4 h-4 rounded-full bg-surface absolute top-1 left-1 shadow transition-transform peer-checked:translate-x-4" />
          </div>
          {label && <span className="font-semibold text-text-secondary">{label}</span>}
        </label>
        {error && <span className="text-caption text-danger font-medium ml-12.5">{error}</span>}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';
