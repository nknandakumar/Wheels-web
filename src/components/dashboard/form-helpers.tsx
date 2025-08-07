"use client";

import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface FormSelectProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  disabled?: boolean;
}

export const FormSelect = ({ control, name, label, placeholder, options, disabled = false }: FormSelectProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

interface FormInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const FormInput = ({ control, name, label, placeholder, type = "text", disabled = false, className, onChange, onBlur }: FormInputProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={className}>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input 
            placeholder={placeholder} 
            type={type} 
            {...field}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) onChange(e);
            }}
            onBlur={(e) => {
              field.onBlur();
              if (onBlur) onBlur(e);
            }}
            disabled={disabled}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
