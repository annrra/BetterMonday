import Image from 'next/image';
import Link from 'next/link';
import styles from './post.module.css';
import { getPostBySlug } from '../../lib/api';
import { Header } from '../../src/components/Header';
import { SideNavBar } from '../../src/components/SideNavBar';
import { Footer } from '../../src/components/Footer';

export default async function Post({ params: {slug} }) {
	const post = await getPostBySlug(slug);
	const postContent = post.post;
	const heroImg = postContent.workItems.itemImage03?.sourceUrl;

	const styleHero = {
    backgroundImage: `url(${heroImg})`,
    width:'100%',
    height:'450px'
  }
  
  return (
		<div className={styles.post}>
			<SideNavBar />
			<div className={styles['post-entry']}>
				<Header mode='dark' />
				<div className={styles['entry-intro']}>
					<div className={styles.heading}>
						<div><h1>{postContent.title}</h1></div>
						<div>
							<h3 className={styles.subtitle}
								dangerouslySetInnerHTML={{
									__html: postContent.workItems.itemSubtitle,
								}}
							/>
						</div>
					</div>
					<div className={styles.entry}>
						<div className={styles['entry-info']}
							dangerouslySetInnerHTML={{
								__html: postContent.workItems.listViewInfo,
							}}
						/>
						<div className={styles['entry-extra']}>
							<h4>{postContent.workItems.additionalInfoTitle}</h4>
							<div
								dangerouslySetInnerHTML={{
									__html: postContent.workItems.additionalField,
								}}
							/>
							<div className={styles.live}>
								<Link href={postContent.workItems.linkExternalSite} target="_blank">view live site</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.body}>
				{(heroImg) && (
					<div id='hero' className={styles.hero} style={styleHero}></div>
				)}
				<div className={styles.showcase}>
					
					{(postContent.featuredImage.node?.sourceUrl) && (
						<div className={styles.block}>
							<div className={styles.sight}>
								<Image
									src={postContent.featuredImage.node.sourceUrl}
									alt={postContent.title}
									className={styles.featured}
									sizes='100vw'
									width={100}
									height={100}
									priority
								/>
							</div>
							<div className={styles.excerpt}>
								{postContent.workItems.captionItemImage}
							</div>
						</div>
					)}
					
					{(postContent.workItems.itemImage01?.sourceUrl) && (
						<div className={styles.block}>
							<div className={styles.sight}>
								<Image
									src={postContent.workItems.itemImage01.sourceUrl}
									alt={postContent.title}
									className={styles.featured}
									sizes='100vw'
									width={100}
									height={100}
									priority
								/>
							</div>
							<div className={styles.excerpt}>
								{postContent.workItems.captionItemImage01}
							</div>
						</div>
					)}
					
					{(postContent.workItems.itemImage02?.sourceUrl) && (
						<div className={styles.block}>
							<div className={styles.sight}>
								<Image
									src={postContent.workItems.itemImage02.sourceUrl}
									alt={postContent.title}
									className={styles.featured}
									sizes='100vw'
									width={100}
									height={100}
									priority
								/>
							</div>
							<div className={styles.excerpt}>
								{postContent.workItems.captionItemImage02}
							</div>
						</div>
					)}

				</div>
				<Footer />
			</div>
		</div>
  )
}
