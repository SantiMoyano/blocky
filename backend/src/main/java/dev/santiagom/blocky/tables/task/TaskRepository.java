package dev.santiagom.blocky.tables.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByFeature_Id(Long featureId);

    List<Task> findAllByFeature_IdAndIsDone(Long featureId, boolean isDone);
}
