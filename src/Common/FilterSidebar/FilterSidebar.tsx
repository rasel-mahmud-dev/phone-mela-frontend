import React, {FC} from 'react';

import {BrandType} from "reducers/productReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "store/index";
import {setSelectedAttributeFilter} from "actions/productAction";


import "./styles.scss"
import {ActionTypes} from "actions/actionTypes";
import {FaAngleDown, FaAngleRight, FaAngleUp, FaTimes} from "react-icons/all";

import filterAbleList from "./filterData"


interface FilterSidebarProps {
    brands: BrandType[]
    returnFilterResultItems: any
}




const FilterSidebar: FC<FilterSidebarProps> = ({brands, returnFilterResultItems}) => {

    const dispatch = useDispatch()
    const {selectedAttributeFilter, filterGroup} = useSelector((state: RootStateType) => state.productState)

    React.useEffect(() => {
        if (brands && brands.length > 0) {
            setBrandPagination({
                ...brandPagination,
                brands: brands.slice(0, 10)
            })
            // let options: { name: string; value: number; }[] = []
            // brands.forEach(brand => {
            //   options.push({name: brand.name, value: brand.id})
            // })
        }
    }, [brands])


    const [expandSection, setExpandSection] = React.useState<string[]>(["brands"])
    const [filterHeight, setFilterHeight] = React.useState<string>('calc(100vh -  52px)')

    const [brandPagination, setBrandPagination] = React.useState({
        brands: [],
        more: true
    })


    const selectedAttributeRef = React.useRef<HTMLDivElement>(null)

    function changeFilterValue(e) {

        const {name, value, attributeName} = e.target
        const updatedSelectedFilter = {...selectedAttributeFilter}
        // let index = updatedSelectedFilter.findIndex(upFilter=>upFilter.attributeName === attributeName)
        // if(index === -1){

        // already selected section value
        if (updatedSelectedFilter[attributeName]) {
            if (typeof value === "string" || typeof value === "number") {
                let i = updatedSelectedFilter[attributeName].findIndex(att => att.value === value)
                if (i === -1) {
                    // push new filter value and name
                    updatedSelectedFilter[attributeName].push({name, value})
                } else {
                    // already selected than remove it
                    updatedSelectedFilter[attributeName].splice(i, 1)
                }

            } else {
                // array range like battery

                let sName = attributeName.toUpperCase() + " " + name
                let i = updatedSelectedFilter[attributeName].findIndex(att => att.name === sName)
                if (i === -1) {
                    updatedSelectedFilter[attributeName].push({name: sName, value: [value[0], value[1]]})
                } else {
                    updatedSelectedFilter[attributeName].splice(i, 1)
                }
            }


        } else {
            // not exiting entry for each section...
            // new selected section value

            if (typeof value === "string") {
                updatedSelectedFilter[attributeName] = [{name: name, value: value}]

            } else if (typeof value === "number") {
                // like ram rom
                updatedSelectedFilter[attributeName] = [{name: name, value: Number(value)}]

            } else {

                // like range battery [{name: "battery 1000-2000", value: [2000, 3000]}]
                if (value.length > 1) {
                    updatedSelectedFilter[attributeName] = [{name: attributeName.toUpperCase() + " " + name, value: [value[0], value[1]]}]
                }
            }
        }


        dispatch(setSelectedAttributeFilter(updatedSelectedFilter))
        {
            returnFilterResultItems(renderSelectedFilterItems(), filterGroup.selectedBrands.length > 0)
        }

        // let data = {}
        //
        // for (let updatedSelectedFilterKey in updatedSelectedFilter) {
        //   // data[updatedSelectedFilterKey] = [
        //     // ...data[updatedSelectedFilterKey],
        //     // updatedSelectedFilter[updatedSelectedFilterKey]
        //   // ]
        //
        //   data[updatedSelectedFilterKey] = [
        //     updatedSelectedFilter[updatedSelectedFilterKey][0].value
        //   ]
        // }

        // api.post("/api/v2/filter-products", data).then(doc=>{
        //   console.log(doc)
        // }).catch(ex=>{
        //   console.log(ex)
        // })

        if (selectedAttributeRef && selectedAttributeRef.current) {
            let height = `calc(100vh - ${selectedAttributeRef.current.offsetHeight + (52 + 32)}px`
            setFilterHeight(height)
        }
    }


    function changeFilterBrandValue(brand) {
        const {name, _id} = brand
        const updatedSelectedBrands = [...filterGroup.selectedBrands]

        let index = updatedSelectedBrands ? updatedSelectedBrands.findIndex(b => b._id === _id) : -1
        if (index !== -1) {
            updatedSelectedBrands.splice(index, 1)
        } else {
            updatedSelectedBrands.push({name, _id})
        }

        dispatch({
            type: ActionTypes.SELECT_BRANDS,
            payload: updatedSelectedBrands
        })

    }


    function toggleExpandSection(attributeName: string) {
        let hasIndex = expandSection.indexOf(attributeName)
        if (hasIndex === -1) {
            setExpandSection([...expandSection, attributeName])
        } else {
            setExpandSection(expandSection.filter(e => e !== attributeName))
        }
    }


    function removeSelectedItem(section_attributeName, item) {
        const updatedSelectedFilter = {...selectedAttributeFilter}
        let i = updatedSelectedFilter[section_attributeName].findIndex(att => att.name === item.name)
        if (i !== -1) {
            // already selected than remove it
            updatedSelectedFilter[section_attributeName].splice(i, 1)
        }
        dispatch(setSelectedAttributeFilter(updatedSelectedFilter))
    }

    function removeSelectedBrandItem(brand) {
        let updatedSelectedBrands = [...filterGroup.selectedBrands]
        const filteredSelectedBrands = updatedSelectedBrands.filter(sb => sb._id !== brand._id)
        dispatch({
            type: ActionTypes.SELECT_BRANDS,
            payload: filteredSelectedBrands
        })
    }

    function renderSelectedFields(data) {
        if (data && Object.keys(data).length > 0) {
            return (
                Object.keys(data).map(selectedAttributeName => (
                    <div className="flex flex-wrap" key={selectedAttributeName}>
                        {data[selectedAttributeName] && data[selectedAttributeName].map((val, ind) =>
                                <span key={ind} className="select-item flex items-center text-xs bg-primary-400/30 px-1 py-0.5 m-0.5 rounded">
                <span>{val.name}</span>
                <FaTimes onClick={() => removeSelectedItem(selectedAttributeName, val)} className="ml-2 select-del"/>
              </span>
                        )}
                    </div>
                ))
            )
        }
    }

    function isChecked(attributeName: string, valName: string, value: string | object) {
        let isCheck = false
        if (selectedAttributeFilter[attributeName]) {
            if (typeof value === "object") {
                let v = attributeName.toUpperCase() + " " + valName
                let idx = selectedAttributeFilter[attributeName].findIndex((i: { name: string; }) => i.name === v)
                if (idx !== -1) {
                    isCheck = true
                }
            } else {
                let idx = selectedAttributeFilter[attributeName].findIndex((i: { name: string; }) => i.name === valName)
                if (idx !== -1) {
                    isCheck = true
                }
            }
        }
        return isCheck
    }

    function checkSelectedBrand(_id: string) {
        let index = filterGroup.selectedBrands.findIndex(b => b._id === _id)
        return index !== -1;
    }

    // these value are selected for products filter
    function renderSelectedBrands(data: { name: string, _id: string }[]) {
        if (data && data.length > 0) {
            return (
                data.map(item => (
                    <div className="flex flex-wrap" key={item._id}>
                        {/*{ data[item] && data[item].map((val, ind)=>*/}
                        <span className="select-item flex items-center text-xs bg-primary-400/30 px-1 py-0.5 m-0.5 rounded">
                <span>{item.name}</span>
                <FaTimes
                    onClick={() => removeSelectedBrandItem(item)}
                    className="ml-2 select-del"/>
              </span>
                        {/*)}*/}
                    </div>
                ))
            )
        }
    }

    function handleShowBrandPagination() {
        if (brandPagination.more) {
            setBrandPagination({
                ...brandPagination,
                more: false,
                brands: brands
            })
        } else {
            setBrandPagination({
                ...brandPagination,
                more: true,
                brands: brands.slice(0, 10)
            })
        }
    }

    function renderSelectedFilterItems() {
        return (
            <div>
                <div ref={selectedAttributeRef} className="flex flex-wrap px-4">
                    {renderSelectedFields(selectedAttributeFilter)}
                </div>
                <div ref={selectedAttributeRef} className="flex flex-wrap px-4">
                    {renderSelectedBrands(filterGroup.selectedBrands)}
                </div>
            </div>
        )
    }


    return (
        <div>

            {/* selected filter values... */}
            <div className="mb-4 mt-1">
                {renderSelectedFilterItems()}
                {returnFilterResultItems(renderSelectedFilterItems(), filterGroup.selectedBrands.length > 0)}
            </div>

            <div className="filter_sections">
                <div
                    onClick={() => toggleExpandSection("brands")}
                    className="cursor-pointer flex items-center justify-between hover:bg-primary-400 px-2 py-2 text-dark-800 hover:text-white">
                    <h2 className="text-sm font-medium  mb-0">Brands</h2>
                    <FaAngleRight/>
                    {/*<FontAwesomeIcon icon={expandSection.indexOf(eachFilter.attributeName) !== -1 ? faAngleDown : faAngleRight} />*/}
                </div>

                {expandSection.indexOf("brands") !== -1 && <div className="px-4 mb-4 mt-1">
                    {brandPagination && brandPagination.brands.map(brand => (
                        <div className="mb-1 flex cursor-pointer hover:text-primary-400 " key={brand.name}>
                            <input
                                id={brand.name + "-" + brand._id}
                                onChange={(e) => changeFilterBrandValue(brand)}
                                checked={checkSelectedBrand(brand._id)}
                                type="checkbox"
                                className="mr-1.5"
                            />
                            <label
                                htmlFor={brand.name + "-" + brand._id}
                                className="cursor-pointer text-[13px] font-normal w-full block">
                                {brand.name}
                            </label>
                        </div>
                        // <li className="text-[13px] font-normal w-full block">{brand.name}</li>
                    ))}
                    <button onClick={handleShowBrandPagination}
                            className="text-sm font-normal cursor-pointer hover:text-primary-400 ">
                        {brandPagination.more ? (
                            <div className="flex items-center">
                                <span className="mr-1 text-[13px] font-normal">Show More</span>
                                <FaAngleDown/>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="mr-1 text-[13px] font-normal">Show Less</span>
                                <FaAngleUp/>
                            </div>
                        )}
                    </button>
                </div>
                }


            </div>

            <div className="filter_sections" style={{height: filterHeight}}>
                {filterAbleList.map((eachFilter, index) => (
                    <div className="my-1" key={index}>
                        <div onClick={() => toggleExpandSection(eachFilter.attributeName)}
                             className="cursor-pointer flex items-center justify-between hover:bg-primary-400 px-2 py-2 text-dark-800 hover:text-white">
                            <h2 className="text-sm font-medium  mb-0">{eachFilter.label}</h2>
                            {expandSection.indexOf(eachFilter.attributeName) !== -1 ?      <FaAngleDown /> : <FaAngleRight /> }
                        </div>
                        {expandSection.indexOf(eachFilter.attributeName) !== -1 && <div className="px-4 mb-4 mt-1">
                            {eachFilter.options && eachFilter.options.map(opt => (
                                <div className="mb-1 flex cursor-pointer hover:text-primary-400 " key={opt.name}>
                                    <input
                                        id={eachFilter.attributeName + "-" + opt.value.toString()}
                                        onChange={(e) =>
                                            changeFilterValue({
                                                target: {
                                                    value: opt.value,
                                                    name: opt.name,
                                                    attributeName: eachFilter.attributeName
                                                }
                                            })
                                        }
                                        checked={isChecked(eachFilter.attributeName, opt.name, opt.value as any)}

                                        type="checkbox"
                                        className="mr-1.5"
                                    />
                                    <label
                                        htmlFor={eachFilter.attributeName + "-" + opt.value.toString()}
                                        className="text-[13px] font-normal w-full block">
                                        {opt.name}
                                    </label>
                                </div>
                            ))}
                        </div>}
                    </div>
                ))}

            </div>

        </div>
    );
};

export default FilterSidebar;