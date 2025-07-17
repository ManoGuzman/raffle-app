import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../context/ReservationContext';
import { reserveNumbers } from '../services/api';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  numbers: yup
    .array()
    .of(yup.string().required('Number is required'))
    .min(1, 'At least one number is required'),
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone is required').matches(/^\d+$/, 'Only digits allowed'),
  email: yup.string().email('Invalid email').notRequired(),
});

export default function ReservePage() {
  const { reservedNumbers, setReservedNumbers, setUserData } = useReservation();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      numbers: reservedNumbers.length ? reservedNumbers : [''],
      name: '',
      phone: '',
      email: '',
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'numbers',
  });

  if (!reservedNumbers.length) {
    navigate('/');
    return null;
  }

  const onSubmit = async (data) => {
    try {
      const res = await reserveNumbers(data);
      if (res.success) {
        setUserData({ name: data.name, phone: data.phone, email: data.email });
        setReservedNumbers(data.numbers);
        navigate('/confirm');
      } else {
        alert(res.message || 'Reservation failed');
      }
    } catch (error) {
      alert('Error reserving numbers');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Apartar Números</h2>

      {fields.map((field, index) => (
        <div key={field.id}>
          <label htmlFor={`number-${index}`} className="block font-semibold mb-1">
            Número {index + 1}
          </label>
          <input
            id={`number-${index}`}
            {...register(`numbers.${index}`)}
            className={`w-full border rounded px-3 py-2 ${
              errors.numbers?.[index] ? 'border-red-500' : ''
            }`}
          />
          {errors.numbers?.[index] && (
            <p className="text-red-600 text-sm">{errors.numbers[index].message}</p>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => append('')}
        className="text-blue-600 hover:underline"
      >
        + Añadir otro número
      </button>

      <div>
        <label htmlFor="name" className="block font-semibold mb-1">
          Nombre completo *
        </label>
        <input
          id="name"
          {...register('name')}
          className={`w-full border rounded px-3 py-2 ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block font-semibold mb-1">
          Teléfono *
        </label>
        <input
          id="phone"
          {...register('phone')}
          className={`w-full border rounded px-3 py-2 ${errors.phone ? 'border-red-500' : ''}`}
        />
        {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block font-semibold mb-1">
          Email (opcional)
        </label>
        <input
          id="email"
          {...register('email')}
          className={`w-full border rounded px-3 py-2 ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Apartando...' : 'Apartar Números'}
      </button>
    </form>
  );
}
