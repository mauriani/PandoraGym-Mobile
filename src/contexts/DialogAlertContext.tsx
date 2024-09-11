import { createContext, useContext, useState } from 'react'
import { DialogAlert } from '@components/DialogAlert'

type IProps = {
  title: string
  message: string
  isButtonCancel?: boolean
  isButtonTitleConfirm?: string
  onConfirm?: () => void | (() => void) | Promise<void> | Promise<boolean>
}
interface DialogAlertContextProps {
  openDialogAlert: (props: IProps) => void
  closeDialog: () => void
}

const DialogAlertContext = createContext<DialogAlertContextProps | undefined>(
  undefined,
)

export const DialogAlertProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogAlertProps, setDialogAlertProps] = useState<IProps>(null)

  const openDialogAlert = (props: IProps) => {
    setIsOpen(true)
    setDialogAlertProps(props)
  }

  const closeDialog = () => {
    setIsOpen(false)
  }

  return (
    <DialogAlertContext.Provider value={{ openDialogAlert, closeDialog }}>
      {children}
      <DialogAlert />
    </DialogAlertContext.Provider>
  )
}

export const useOpenDialogAlert = () => useContext(DialogAlertContext)
