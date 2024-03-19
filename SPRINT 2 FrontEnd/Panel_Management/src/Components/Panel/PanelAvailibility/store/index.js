import { configureStore} from '@reduxjs/toolkit'
import panelAvailReducer from './panelavailability'

const store=configureStore({
    reducer: {panelAvailability: panelAvailReducer}
})

export default store;