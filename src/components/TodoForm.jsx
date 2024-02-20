import { useForm } from 'react-hook-form';

const TodoForm = ({ addTodo }) => {
  const {
    register, 
    handleSubmit, 
    setValue, 
    setFocus,
    reset,
    formState: {errors}, 
  } = useForm({defaultValues: {
    cep: "",
    address: "",
    neighborhood: "",
    city: "",
    state: "", 
    addressNumber: "",
    addressExtra: "",
    prioridade: "",
  }});

  const onSubmit = (data) => {
    console.log(data);
    addTodo( 
      data.cep,
      data.address,
      data.neighborhood,
      data.city,
      data.state, 
      data.addressNumber,
      data.addressExtra,
      data.prioridade
    );
    reset();
  };

  const checkCep = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    setValue('cep', cep)
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json()).then(dados => {
        setValue('address', dados.logradouro);
        setValue('neighborhood', dados.bairro);
        setValue('city', dados.localidade);
        setValue('state', dados.uf);
        setFocus('addressNumber');
      });
  }

  return (
    <div className='todo-form'>
      <label>
        CEP: 
        <input 
          className={errors?.cep && "input-error"}
          type='text' 
          placeholder='Digite o CEP'
          {...register("cep", {required: true})} 
          onBlur={checkCep}
        />
        {errors?.cep?.type === 'required' && <p className='error-message'>É obrigatório inserir o CEP.</p>}
      </label>
      <label>
        Logradouro:
        <input 
          className={errors?.address && "input-error"}
          type="text" 
          placeholder='Digite o logradouro'
          {...register("address", {required: true})} 
        />
        {errors?.address?.type === 'required' && <p className='error-message'>É obrigatório inserir o logradouro.</p>}
      </label>
      <label>
        Número:
        <input 
          className={errors?.addressNumber && "input-error"}
          type="text" 
          placeholder='Digite o número'
          {...register("addressNumber", {required: true})}  
        />
        {errors?.addressNumber?.type === 'required' && <p className='error-message'>É obrigatório inserir o número.</p>}
      </label>
      <label>
        Complemento (opcional):
        <input 
          type="text" 
          placeholder='Digite o complemento (se houver)'
          {...register("addressExtra")}
        />
      </label>
      <label>
        Bairro:
        <input 
          className={errors?.neighborhood && "input-error"}
          type="text" 
          placeholder='Digite o bairro'
          {...register("neighborhood", {required: true})} 
        />
        {errors?.neighborhood?.type === 'required' && <p className='error-message'>É obrigatório inserir o bairro.</p>}
      </label>
      <label>
        Cidade:
        <input 
          className={errors?.city && "input-error"}
          type="text" 
          placeholder='Digite a cidade'
          {...register("city", {required: true})} 
        />
        {errors?.city?.type === 'required' && <p className='error-message'>É obrigatório inserir a cidade.</p>}
      </label>
      <label>
        UF:
        <input 
          className={errors?.state && "input-error"}
          type="text" 
          placeholder='Digite a UF'
          {...register("state", {required: true})}  
        />
        {errors?.state?.type === 'required' && <p className='error-message'>É obrigatório inserir a UF.</p>}
      </label>
      <select 
        className={errors?.prioridade && "input-error"}
        {...register("prioridade", 
        {validate: (value) =>{
          return value != ''
        }})} 
      >
        <option value=''>Selecione a prioridade</option>
        <option value='Urgente'>Urgente</option>
        <option value='Normal'>Normal</option>
      </select>
      {errors?.prioridade?.type === 'validate' && <p className='error-message'>É obrigatório selecionar a prioridade.</p>}
      <button onClick={() => {handleSubmit(onSubmit)()}}>Adicionar à lista</button>
    </div>
  )
}

export default TodoForm