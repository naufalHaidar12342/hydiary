{
	/* 
<div className="p-4 lg:max-w-6xl mx-auto">
				<div className="carousel w-full">
					{certificates.map((certificate, index) => {
						//lg: h-800px, w-1200px
						//smaller than lg: h-250px, w-360px
						return (
							<div
								id={`slide-${certificate.id}`}
								key={certificate.id}
								className="carousel-item relative w-full lg:h-[800px] h-[250px]"
							>
								<Image
									fill
									style={{ objectFit: "contain" }}
									src={certificate.certificateImage.url}
									className="w-full"
									alt={certificate.certificateName}
								/>
								<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
									<a
										href={`#slide-${
											certificates[
												index === 0 ? certificates.length - 1 : index - 1
											].id
										}`}
										className="btn btn-circle lg:btn-lg"
									>
										❮
									</a>
									<a
										href={`#slide-${
											certificates[
												index === certificates.length - 1 ? 0 : index + 1
											].id
										}`}
										className="btn btn-circle lg:btn-lg"
									>
										❯
									</a>
								</div>
							</div>
						);
					})}
				</div>
			</div>
*/
}
