import { useState } from 'react';
import Image from 'next/image';
import { COUNTRIES } from '@/config/constants';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  countryOfCitizenship: string;
  linkedin: string;
  resume: File | null;
  visasInterested: string[];
  openInput: string;
};

type FormErrors = Partial<Record<keyof FormData, string>> & { submit?: string };

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  countryOfCitizenship: '',
  linkedin: '',
  resume: null,
  visasInterested: [],
  openInput: '',
};

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      visasInterested: checked
        ? [...prev.visasInterested, value]
        : prev.visasInterested.filter(v => v !== value)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.countryOfCitizenship) newErrors.countryOfCitizenship = 'Country of citizenship is required';
    if (!formData.linkedin) newErrors.linkedin = 'LinkedIn URL is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';
    if (formData.visasInterested.length === 0) newErrors.visasInterested = 'Please select at least one visa category';
    if (!formData.openInput) newErrors.openInput = 'Please tell us how we can help you';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'visasInterested') {
        formData.visasInterested.forEach((visa: string) => formDataToSend.append('visasInterested', visa));
      } else if (key === 'resume' && value instanceof File) {
        formDataToSend.append('resume', value);
      } else {
        formDataToSend.append(key, value as string);
      }
    });

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit lead');
      }

      const result = await response.json();
      console.log('Lead submitted successfully:', result);

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting lead:', error);
      setErrors(prev => ({ ...prev, submit: 'Failed to submit lead. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center max-w-lg mx-auto">
        <Image src="/images/checkmark-icon.png" alt="Info" width={48} height={48} className="mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Thank You</h2>
        <p className="mb-4 font-bold">Your information was submitted to our team of immigration attorneys. Expect an email from hello@tryalma.ai.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-black text-white font-bold py-4 px-24 rounded-lg hover:bg-gray-800 transition duration-300 mt-8 text-sm "
        >
          Go Back to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-0">
      <div className="flex flex-col items-center mb-4">
        <Image src="/images/info-icon.png" alt="Info" width={48} height={48} />
        <h2 className="text-2xl font-semibold mt-4">Want to understand your visa options?</h2>
        <p className="mb-6 mt-6 font-bold text-center">
          Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        <div>
          <label htmlFor="firstName" className="block mb-2 font-semibold hidden">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="First Name"
          />
          {errors.firstName && <p className="text-red-500 mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block mb-2 font-semibold hidden">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Last Name"
          />
          {errors.lastName && <p className="text-red-500 mt-1">{errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-semibold hidden">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="countryOfCitizenship" className="block mb-2 font-semibold hidden">Country of Citizenship</label>
          <select
            id="countryOfCitizenship"
            name="countryOfCitizenship"
            value={formData.countryOfCitizenship}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-gray-400"
          >
            <option value="">Country of Citizenship</option>
            {COUNTRIES.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.countryOfCitizenship && <p className="text-red-500 mt-1">{errors.countryOfCitizenship}</p>}
        </div>

        <div>
          <label htmlFor="linkedin" className="block mb-2 font-semibold hidden">LinkedIn URL</label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="LinkedIn / Personal Website URL"
          />
          {errors.linkedin && <p className="text-red-500 mt-1">{errors.linkedin}</p>}
        </div>

        <div>
          <label htmlFor="resume" className="file-upload-label">
            <div className="file-upload-button">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 16.2091 19.2091 18 17 18H7C4.79086 18 3 16.2091 3 14C3 11.7909 4.79086 10 7 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12V15M12 15L14 13M12 15L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Upload Resume/CV
              <span className="file-name">
                {formData.resume ? formData.resume.name : 'No file chosen'}
              </span>
            </div>
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx"
          />
          {errors.resume && <p className="text-red-500 mt-1">{errors.resume}</p>}
        </div>

        <div>
          <div className="flex flex-col items-center mb-2">
            <Image src="/images/identify-icon.png" alt="Dice" width={48} height={48} />
            <h3 className="text-2xl font-semibold ml-2">Visa categories of interest?</h3>
          </div>
          <div className="space-y-2">
            {['O-1', 'EB-1A', 'EB-2 NIW', "I don't know"].map(visa => (
              <label key={visa} className="flex items-center">
                <input
                  type="checkbox"
                  name="visasInterested"
                  value={visa}
                  checked={formData.visasInterested.includes(visa)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {visa}
              </label>
            ))}
          </div>
          {errors.visasInterested && <p className="text-red-500 mt-1">{errors.visasInterested}</p>}
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="flex flex-col items-center mb-2">
            <Image src="/images/identify-icon.png" alt="Heart" width={48} height={48} />
            <h3 className="text-2xl font-semibold mb-4">How can we help you?</h3>
          </div>
          <textarea
            id="openInput"
            name="openInput"
            value={formData.openInput}
            onChange={handleInputChange}
            className="w-full p-2 border rounded max-w-md"
            rows={4}
            placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
          ></textarea>
          {errors.openInput && <p className="text-red-500 mt-1">{errors.openInput}</p>}
        </div>

        {errors.submit && <p className="text-red-500 mt-1">{errors.submit}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full max-w-md bg-black text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300 disabled:opacity-50 rounded-lg !mt-12"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
