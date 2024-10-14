import CategoryItem from '../category-item/category-item.component';
import '../directory/directory.styles.scss'

//Directory to print all items
const Directory=({categories})=>{
    return (
        <div className="categories-container">
        {categories.map( (category) => {
          return <CategoryItem key={category.id} category={category}/>
        })}
      </div>
    )
}

export default Directory;