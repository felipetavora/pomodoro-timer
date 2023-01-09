import { FormContainer, MinutesAmountInput, TaskInput } from './styles';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { CyclesContext } from '../../../../contexts/CyclesContext';

export function NewCycleForm() {
   const { activeCycle } = useContext(CyclesContext);
   const { register } = useFormContext();

   return (
      <FormContainer>
         <label htmlFor="task">Vou trabalhar em</label>
         <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para seu projeto"
            minLength={2}
            {...register('task')}
            disabled={!!activeCycle}
            autoComplete="off"
         />
         <label htmlFor="minutesAmount">durante</label>
         <MinutesAmountInput
            id="minutesAmount"
            type="number"
            defaultValue={5}
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
            disabled={!!activeCycle}
         />
         <span>minutos.</span>
      </FormContainer>
   );
}
