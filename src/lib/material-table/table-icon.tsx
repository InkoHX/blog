/* eslint-disable react/display-name */
import {
  Check as CheckIcon,
  Clear as ClearIcon,
  Edit as EditIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  Search as SearchIcon,
  ViewColumn as ViewColumnIcon
} from '@material-ui/icons'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import * as React from 'react'

const Add = React.forwardRef<SVGSVGElement>((props, ref) => <AddBox {...props} ref={ref} />)
const Check = React.forwardRef<SVGSVGElement>((props, ref) => <CheckIcon {...props} ref={ref} />)
const Clear = React.forwardRef<SVGSVGElement>((props, ref) => <ClearIcon {...props} ref={ref} />)
const Delete = React.forwardRef<SVGSVGElement>((props, ref) => <DeleteOutline {...props} ref={ref} />)
const DetailPanel = React.forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />)
const Edit = React.forwardRef<SVGSVGElement>((props, ref) => <EditIcon {...props} ref={ref} />)
const Export = React.forwardRef<SVGSVGElement>((props, ref) => <SaveAlt {...props} ref={ref} />)
const Filter = React.forwardRef<SVGSVGElement>((props, ref) => <FilterList {...props} ref={ref} />)
const FirstPage = React.forwardRef<SVGSVGElement>((props, ref) => <FirstPageIcon {...props} ref={ref} />)
const LastPage = React.forwardRef<SVGSVGElement>((props, ref) => <LastPageIcon {...props} ref={ref} />)
const NextPage = React.forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />)
const PreviousPage = React.forwardRef<SVGSVGElement>((props, ref) => <ChevronLeft {...props} ref={ref} />)
const ResetSearch = React.forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />)
const Search = React.forwardRef<SVGSVGElement>((props, ref) => <SearchIcon {...props} ref={ref} />)
const SortArrow = React.forwardRef<SVGSVGElement>((props, ref) => <ArrowDownward {...props} ref={ref} />)
const ThirdStateCheck = React.forwardRef<SVGSVGElement>((props, ref) => <Remove {...props} ref={ref} />)
const ViewColumn = React.forwardRef<SVGSVGElement>((props, ref) => <ViewColumnIcon {...props} ref={ref} />)

export const tableIcons = {
  Add,
  Check,
  Clear,
  Delete,
  DetailPanel,
  Edit,
  Export,
  Filter,
  FirstPage,
  LastPage,
  NextPage,
  PreviousPage,
  ResetSearch,
  Search,
  SortArrow,
  ThirdStateCheck,
  ViewColumn
}
