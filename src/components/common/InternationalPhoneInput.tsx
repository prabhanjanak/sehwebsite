import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface InternationalPhoneInputProps {
  value: string;
  onChange: (phone: string, countryData?: any) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  defaultCountry?: string;
}

export const InternationalPhoneInput: React.FC<InternationalPhoneInputProps> = ({
  value,
  onChange,
  placeholder = 'Enter mobile number',
  required = false,
  disabled = false,
  className = '',
  defaultCountry = 'in'
}) => {
  return (
    <div className={`international-phone-container ${className}`}>
      <style>{`
        .international-phone-container .react-tel-input .form-control {
          width: 100% !important;
          height: 44px !important;
          border-radius: 12px !important;
          border: 1px solid #e2e8f0 !important;
          font-size: 13px !important;
          font-family: inherit !important;
          color: #0f172a !important;
          background-color: #f8fafc !important;
          padding-left: 52px !important;
          transition: all 0.2s ease-in-out !important;
        }
        .international-phone-container .react-tel-input .form-control:focus {
          border-color: #f97316 !important;
          box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.2) !important;
          background-color: #ffffff !important;
          outline: none !important;
        }
        .international-phone-container .react-tel-input .flag-dropdown {
          border-radius: 12px 0 0 12px !important;
          border: 1px solid #e2e8f0 !important;
          border-right: none !important;
          background-color: #f1f5f9 !important;
          transition: all 0.2s ease-in-out !important;
        }
        .international-phone-container .react-tel-input .flag-dropdown:hover {
          background-color: #e2e8f0 !important;
        }
        .international-phone-container .react-tel-input .flag-dropdown.open {
          background-color: #ffffff !important;
          border-radius: 12px 0 0 0 !important;
        }
        .international-phone-container .react-tel-input .country-list {
          border-radius: 12px !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
          border: 1px solid #e2e8f0 !important;
          font-size: 12px !important;
          z-index: 100 !important;
        }
        .international-phone-container .react-tel-input .country-list .country.highlight {
          background-color: #fff7ed !important;
          color: #ea580c !important;
        }
        .international-phone-container .react-tel-input .selected-flag {
          width: 44px !important;
          padding: 0 0 0 10px !important;
          border-radius: 12px 0 0 12px !important;
        }
      `}</style>
      <PhoneInput
        country={defaultCountry}
        value={value}
        onChange={(phone, data) => onChange(phone, data)}
        placeholder={placeholder}
        disabled={disabled}
        inputProps={{
          required: required,
          name: 'phone',
          autoComplete: 'tel'
        }}
        enableSearch={true}
        searchPlaceholder="Search country..."
        searchNotFound="No country found"
        preferredCountries={['in', 'us', 'gb', 'ae', 'sg', 'ca', 'au']}
      />
    </div>
  );
};
