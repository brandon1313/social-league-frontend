import { Toaster, toast } from 'sonner';

export const Notificiation = (message) => {

    return (
        <div>
            <Toaster />
            <button onClick={ () => toast(message) } >
                Aceptar
            </button>
        </div>
    )
}