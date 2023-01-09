import { HomeContainer, StartCountDownButton, StopCountDownButton } from './styles';
import { HandPalm, Play } from 'phosphor-react';
import { NewCycleForm } from './components/NewCycleForm';
import { CountDown } from './components/Countdown';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { CyclesContext } from '../../contexts/CyclesContext';

interface NewCycleFormData {
   task: string;
   minutesAmount: number;
}

export function Home() {
   const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext);

   const newCycleFormValidationSchema = zod.object({
      task: zod.string().min(2, 'Informe a tarefa'),
      minutesAmount: zod
         .number()
         .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
         .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
   });

   const newCycleForm = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
         task: '',
         minutesAmount: 5,
      },
   });

   const { handleSubmit, watch, reset } = newCycleForm;
   const task = watch('task');
   const isSubmitDisabled = task.length < 2;

   function handleCrateNewCycle(data: NewCycleFormData) {
      createNewCycle(data);
      reset();
   }

   return (
      <HomeContainer>
         <form onSubmit={handleSubmit(handleCrateNewCycle)}>
            <FormProvider {...newCycleForm}>
               <NewCycleForm />
            </FormProvider>
            <CountDown />
            {activeCycle ? (
               <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
                  <HandPalm size={24} />
                  Interromper
               </StopCountDownButton>
            ) : (
               <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
                  <Play size={24} weight="fill" />
                  Começar
               </StartCountDownButton>
            )}
         </form>
      </HomeContainer>
   );
}
