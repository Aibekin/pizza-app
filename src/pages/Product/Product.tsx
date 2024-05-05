import { Await, Link, useLoaderData } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import { Suspense, MouseEvent } from "react";
import Button from "../../components/Button/Button";
import styles from "./Product.module.css";
import Heading from "../../components/Heading/Heading";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
// import { ProductCardProps } from "../../components/ProductCard/ProductCard.props";

export function ProductPage() {
	const data = useLoaderData() as { data: Product };

	const dispatch = useDispatch<AppDispatch>();
	const add = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.add(data.data.id));
	};

	return <>
		<Suspense fallback={"Загружаю..."}>
			<Await
				resolve={data.data}
			>
				{({ data }: { data: Product }) => (
					<div className={styles["product"]}>
						<div className={styles["header"]}>
							<Link to={"/"} className={styles["back"]}>
								<img src="/back-icon.svg" />
							</Link>
							<Heading className={styles["name"]}>{data.name}</Heading>
							<Button appearence="small" className={styles["button"]} onClick={add}>
								<img src="/cart-button-icon.svg" alt="" />&nbsp;
								В корзину
							</Button>
						</div>
						<div className={styles["content"]}>
							<div className={styles["image"]} style={{ backgroundImage: `url(${data.image})` }}></div>
							<div className={styles["description"]}>
								<div className={styles["wrapper"]}>
									<div className={styles["text"]}>Цена</div>
									<div className="price">{data.price}&nbsp;<span>₽</span></div>
								</div>
								<div className={styles["wrapper"]}>
									<div className={styles["text"]}>Рейтинг</div>
									<div className={styles["rating"]}>
										{data.rating}&nbsp;
										<img src="/star-icon.svg" alt="" />
									</div>
								</div>
								<div className={styles["text"]}>Состав:</div>
								<ul className={styles["ingredients"]}>
									{data.ingredients.map(i => <li>{i}</li>)}
								</ul>
							</div>
						</div>
					</div>
				)}
			</Await>
		</Suspense>
	</>;
}